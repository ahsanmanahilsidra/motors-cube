
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../(services)/user.service';
import { AlertController, ModalController, PopoverController, LoadingController } from '@ionic/angular';
import { MyCarAdsPaymentComponent } from 'src/app/(car)/my-car-ads-payment/my-car-ads-payment.component';

@Component({
  selector: 'app-bike-you-posted',
  templateUrl: './bike-you-posted.page.html',
  styleUrls: ['./bike-you-posted.page.scss'],
  standalone:false,
})
export class BikeYouPostedPage implements OnInit {

postItem: any;
closeDialog() {
throw new Error('Method not implemented.');
}
  navController: any;
  hire: any[] = [];  // This will store posts with post_type = 'hire'
  sale: any[] = [];  // This will store posts with post_type = 'sale'
  carHireData: any[] = [];
  carSaleData: any[] = [];
  carpostData: any[] = [];
  filterData: any[] = [];
  filteredCarSaleData: any[] = [];
  filteredCarPostData: any[] = [];
  filteredCarHireData: any[] = [];
  userID = '';
  deleteid='';
  deletetype= '';

   // Initialize as false

  showSendPaymentButton = false; // Boolean variable to control button visibility
  showupgradebutton= false;

    //alertController: any;

    constructor(private router: Router, 
      private userService: UserService, 
      private modalController: ModalController,
      private popoverController: PopoverController, 
      private alertController: AlertController,
      private cdr: ChangeDetectorRef,
      private loadingController: LoadingController ) {
this.userID = sessionStorage.getItem('userId') ?? '';  // Assign an empty string if null
if(this.userID==''){
this.userID=localStorage.getItem('userId')?? '';
}

}


  ngOnInit() {
    this.fetchCarSale();
    this.fetchUpgradePost();
    this.fetchcarHire();
  }
  // Function to check the condition and set the boolean variable

  // Function to check the payment status and set the boolean variable
  checksalePaymentStatus(saleItemId: string): boolean {
    // Initialize the flag to false before checking
    let isButtonVisible = false;
  
    // Loop through all items in the sale array
    for (let saleItem of this.sale) {
      // Check if the payment_status is 'Pending' and the post_id matches the saleItemId
      if (saleItem.post_status === 'Pending' && saleItem.post_id.toString() === saleItemId) {
        isButtonVisible = true; // Set to true if the condition is met
        break; // Stop checking once a matching item is found
      }
    }
  
    // Set the flag for showing the payment button based on whether a valid sale item was found
    this.showSendPaymentButton = isButtonVisible;
  
    // Return whether the button should be shown
    return this.showSendPaymentButton;
  }
  checkhirePaymentStatus(saleItemId: string): boolean {
    // Initialize the flag to false before checking
    let isButtonVisible = false;
  
    // Loop through all items in the sale array
    for (let saleItem of this.hire) {
      // Check if the payment_status is 'Pending' and the post_id matches the saleItemId
      if (saleItem.post_status === 'Pending' && saleItem.post_id.toString() === saleItemId) {
        isButtonVisible = true; // Set to true if the condition is met
        break; // Stop checking once a matching item is found
      }
    }
  
    // Set the flag for showing the payment button based on whether a valid sale item was found
    this.showSendPaymentButton = isButtonVisible;
  
    // Return whether the button should be shown
    return this.showSendPaymentButton;
  }
  checksaleUpgradeStatus(saleItemId: string): boolean {
    // Initialize the flag to false before checking
    let isUpgradeButtonVisible = true;
  
    // Loop through all items in the sale array
    for (let saleItem of this.sale) {
    if(saleItem.post_id.toString() === saleItemId){      // Check if post_status is 'Pending' and post_id matches the saleItemId
      if (saleItem.post_status !== 'Pending' ) {
        isUpgradeButtonVisible = true; // Set to true if the condition is met
        break; // Stop checking once a matching item is found
        
      }
      if (saleItem.post_status === 'Pending' ) {
        isUpgradeButtonVisible = false; // Set to true if the condition is met
       
        break; // Stop checking once a matching item is found
        
      }
    }
    else{
      
       if (saleItem.post_id !== saleItemId) {
        isUpgradeButtonVisible = true; // Set to true if any post_id doesn't match
      }
      else{
        isUpgradeButtonVisible = false;
    
      }
    }
    }
  
    // Set the flag for showing the upgrade button based on whether a valid sale item was found
    this.showupgradebutton = isUpgradeButtonVisible;
    
    // Return whether the upgrade button should be shown
    return this.showupgradebutton;
  }
  checkhireUpgradeStatus(saleItemId: string): boolean {
    let isUpgradeButtonVisible = true;
  
    // Loop through all items in the sale array
    for (let saleItem of this.hire) {
    if(saleItem.post_id.toString() === saleItemId){      // Check if post_status is 'Pending' and post_id matches the saleItemId
      if (saleItem.post_status !== 'Pending' ) {
        isUpgradeButtonVisible = true; // Set to true if the condition is met
        console.log('true1')
        break; // Stop checking once a matching item is found
        
      }
      if (saleItem.post_status === 'Pending' ) {
        isUpgradeButtonVisible = false; // Set to true if the condition is met
        console.log('true2')
        break; // Stop checking once a matching item is found
        
      }
    }
    else{
       if (saleItem.post_id !== saleItemId) {
        isUpgradeButtonVisible = true; // Set to true if any post_id doesn't match
        console.log('true3')
      }
      else{
        isUpgradeButtonVisible = false;
        console.log('true4')
      }
    }
    }
  
    // Set the flag for showing the upgrade button based on whether a valid sale item was found
    this.showupgradebutton = isUpgradeButtonVisible;
 
    // Return whether the upgrade button should be shown
    return this.showupgradebutton;
  }


trackByPostId(index: number, postItem: any): string {
  return postItem.post_id; // Ensure a unique identifier is used
}
 
  back(){
    window.history.back();
  }
  truncateText(text: string, limit: number): string {
    if (!text) {
      return '';
    }
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }
  // Function to open the dialogue box
  async openDialogueBox(carSaleId: string) {
    const modal = await this.modalController.create({
        component: MyCarAdsPaymentComponent, // Pass your component
        componentProps: {
            carAdSaleId: carSaleId // Pass the carAdSaleId to the component
        }
    });
    return await modal.present();
}



  


  async showPopup(popupId: string) {
    const popupDiv = document.getElementById(popupId);
    if (popupDiv) {
      popupDiv.classList.add('show'); // Show the specified popup
    }
  }

  async closePopup(popupId: string) {
    console.log('Closing popup:', popupId); // Check if the function is being called
    const popupDiv = document.getElementById(popupId);
    console.log('Popup div:', popupDiv); // Check if the popup element is found
    if (popupDiv) {
      popupDiv.classList.remove('show'); // Hide the specified popup
    }
  }



// home.page.ts
async buttonOneAction(id: string, saletype: string) {
  console.log('Hotspot button clicked with ID:', id, 'and saleType:', saletype);
  // Add your logic for the Hotspot button here, using the passed ID and saleType
  this.router.navigate(['/ads-upgrade-hotspot'], {
    queryParams: {
      adsId: id,
      saleType: saletype, // Additional parameter
    }
  });
}


  async buttonTwoAction(id: string, saletype: string) {
    console.log('Supreme button clicked with ID:', id);
    // Add your logic for the Supreme button here, using the passed ID
    this.router.navigate(['/ads-upgrade-supreme'], {
      queryParams: {
        adsId: id,
        saleType: saletype,
      }
    });
  }

  async confirmDelete(id: string, saletype: string) {
    console.log('id : ', id , 'and type : ', saletype);
    this.deleteid = id ;
    this.deletetype = saletype;
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Delete cancelled');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Item deleted');
            // Here you can call your delete logic or service
            this.deleteItem();
          }
        }
      ]
    });

    await alert.present();
  }


  
 
 

  async editSale(id: any){
    this.router.navigate(['/car-ad-sale-update'], {
      queryParams: {
        adsId: id,
      }
    });
  }

  async editHire(id: any){
    this.router.navigate(['/car-ad-hire-update'], {
      queryParams: {
        adsId: id,
      }
    });
  }


  // Function to show a loader
  async showLoader(message: string) {
    const loader = await this.loadingController.create({
      message: message,
      spinner: 'circles',  // You can change the spinner type if you'd like
      backdropDismiss: false, // Prevent the loader from being dismissed by tapping outside
    });
    await loader.present();
    return loader;
  }

  // Function to hide the loader
  async hideLoader(loader: any) {
    await loader.dismiss();
  }

  async fetchCarSale() {
  
    this.userService.getCarSale().subscribe({
      next: (data) => {
        this.carSaleData = data;
        this.filteredCarSaleData = this.carSaleData.filter(item => item.user_id === this.userID);
        console.log('Filtered car sale data:', this.filteredCarSaleData);
        this.cdr.detectChanges();
        
      },
      error: (error) => {
        console.error('Error fetching car sale data:', error);
        
      }
    });
  }

  async fetchUpgradePost() {

    this.userService.getupgradepost().subscribe({
      next: (data) => {
        this.carpostData = data;
        this.filteredCarPostData = this.carpostData.filter(item => item.user_id === this.userID);
        this.hire = this.filteredCarPostData.filter(item => item.post_type === 'Hire');
        this.sale = this.filteredCarPostData.filter(item => item.post_type === 'Sale');

      },
      error: (error) => {
        console.error('Error fetching upgrade post data:', error);

      }
    });
  }

  async fetchcarHire() {
  
    this.userService.getCarHire().subscribe({
      next: (data) => {
        this.carHireData = data;
        this.filteredCarHireData = this.carHireData.filter(item => item.user_id === this.userID);
        console.log('Filtered car hire data:', this.filteredCarHireData);
        this.cdr.detectChanges();
 
      },
      error: (error) => {
        console.error('Error fetching car hire data:', error);
    
      }
    });
  }

  // Other methods like deleteItem, editSale, editHire, etc., should also handle loading states similarly.
  
  async deleteItem() {
    const loader = await this.showLoader('Deleting item...');
    const formData = new FormData();
    formData.append('deleteid', this.deleteid);
    formData.append('deletetype', this.deletetype);

    this.userService.carDeleteAds(formData).subscribe(
      (response) => {
        console.log('Data deleted successfully:', response);
        this.fetchCarSale();
        this.fetchcarHire();
        this.cdr.detectChanges();
        this.hideLoader(loader); // Hide the loader once the item is deleted
      },
      (error) => {
        console.error('Error deleting data:', error);
        this.hideLoader(loader); // Hide the loader if there's an error
      }
    );
  }

  // Add other necessary methods here...
}
