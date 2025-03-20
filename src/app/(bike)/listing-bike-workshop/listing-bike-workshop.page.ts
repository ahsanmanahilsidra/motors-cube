import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PopoverController, Platform } from '@ionic/angular';
import { BikeService } from 'src/app/(services)/bike.service';
import { UserService } from 'src/app/(services)/user.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-listing-bike-workshop',
  templateUrl: './listing-bike-workshop.page.html',
  styleUrls: ['./listing-bike-workshop.page.scss'],
  standalone:false,
})
export class ListingBikeWorkshopPage implements OnInit {

  workshopData: any[] = [];
  filterData: any[] = [];
  selectedcon: any[] = [];
  selectedcity: any[] = [];
  selectedConditions: any[] = [];
  stepper: any;
  
  constructor(public router: Router, private popoverController: PopoverController, private userService: UserService,
    private route: ActivatedRoute,private cdr: ChangeDetectorRef,private platform: Platform, private bikeservice:BikeService,
    private location: Location,) {
    this.route.queryParams.subscribe(params => {
       this.selectedcon = params['selectedcon'];
       this.selectedcity = params['selectedcity'];
       this.selectedConditions = params['selectedConditions'];
       console.log('condition : ',this.selectedcon);
    console.log('city' , this.selectedcity);
    console.log('city' , this.selectedConditions);
    this.fetchWorkshopData();
   
    });

   }


  ngOnInit() {
    //this.fetchworkshopData();
  }
  truncateText(text: string, wordLimit: number): string {
    const words = text.split(/\s+/); // Split by one or more spaces
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'; // Add dots if limit is exceeded
    }
    return text;
  }
  back() {
    this.router.navigate(['bike-home']);
    localStorage.removeItem('selectedcon');
    localStorage.removeItem('selectedcity');
    localStorage.removeItem('selectedCity');
    localStorage.removeItem('selectedconditions');
  }
  

  filter(){
    this.router.navigate(['bike-workshop-filter']);
  }
  fetchWorkshopData() {
    // Check if workshop data is already cached
    const cachedWorkshopData = localStorage.getItem('bikeworkshopData');
    if (cachedWorkshopData) {
      // If cached data exists, use it directly
      this.workshopData = JSON.parse(cachedWorkshopData);
      console.log('Using cached workshop data:', this.workshopData);
      this.filterCarData(); // Apply filters after fetching data
      return;
    }
  
    // Otherwise, fetch data from the backend
    this.bikeservice.getworkshopData().subscribe({
      next: (data: string[]) => {
        this.workshopData = data; // Store fetched workshop data
        // Cache the fetched data in localStorage for future use
        localStorage.setItem('bikeworkshopData', JSON.stringify(data));
        console.log('Fetched workshop data:', this.workshopData);
        this.filterCarData(); // Apply filters after data is fetched
      },
      error: (error: any) => {
        console.error('Error fetching workshop data:', error);
        // Optionally, show an error message to the user
      }
    });
  }
  

  async sortCars(sortType?: string) {
    if (sortType === 'oldestToNewest') {
      this.workshopData.sort((a, b) => {
        const dateA = new Date(a.post_created_date).getTime();
        const dateB = new Date(b.post_created_date).getTime();
        return dateA - dateB; // Sort from oldest to newest
      });
    } else if (sortType === 'latestToOldest') {
      this.workshopData.sort((a, b) => {
        const dateA = new Date(a.post_created_date).getTime();
        const dateB = new Date(b.post_created_date).getTime();
        return dateB - dateA; // Sort from latest to oldest
      });
    }
  
    // Update filterData to reflect the sorted dealershipData
    this.filterData = [...this.workshopData];  // Create a shallow copy of the sorted array
  
    // Manually trigger change detection
    this.cdr.detectChanges();
  
    // Dismiss the popover
    await this.popoverController.dismiss();
  
    // Log filterData to verify sorting
    console.log(this.filterData);
  } 


  filterCarData() {
    // Ensure selected conditions arrays exist and are arrays
    const city = this.selectedcity || [];
    const conditions = this.selectedcon || [];
    const categories = this.selectedConditions || [];
    console.log('city1  :  ', city);
    console.log('condition1  :  ', conditions);
    console.log('categories  :  ', categories);
    this.filterData = this.workshopData.filter(car =>
      car.post_status === 'Active' &&
      (city.length === 0 || city.includes(car.workshop_city)) &&
      (conditions.length === 0 || conditions.includes(car.workshop_featured_type)) &&
      (categories.length === 0 || categories.some(category => car.workshop_category.includes(category)))
    );
  }

  navigateToworkshopSingle(id: string) {
    this.router.navigate(['/workshop-single-view'], {
      queryParams: {
        workshopId: id,
      }
    });
    console.log(id);
  }

}

