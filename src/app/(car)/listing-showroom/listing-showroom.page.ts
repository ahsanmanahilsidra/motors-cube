
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../(services)/user.service';
import { AlertController, PopoverController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
@Component({
    selector: 'app-listing-showroom',
    templateUrl: './listing-showroom.page.html',
    styleUrls: ['./listing-showroom.page.scss'],
    standalone: false
})
export class ListingShowroomPage implements OnInit {
  showroomData: any[] = [];
  filterData: any[] = [];
  selectedcon: any[] = [];
  selectedcity: any[] = [];
  constructor(public router: Router, private popoverController: PopoverController, private userService: UserService,private cdr: ChangeDetectorRef,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
       this.selectedcon = params['selectedcon'];
       this.selectedcity = params['selectedcity'];
       console.log('condition : ',this.selectedcon);
    console.log('city' , this.selectedcity);
    this.fetchshowroomData();
    });

   }


  ngOnInit() {
    //this.fetchshowroomData();
  }
  truncateText(text: string, wordLimit: number): string {
    const words = text.split(/\s+/); // Split by one or more spaces
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'; // Add dots if limit is exceeded
    }
    return text;
  }
  async sortCars(sortType?: string) {
    if (sortType === 'oldestToNewest') {
      this.showroomData.sort((a, b) => {
        const dateA = new Date(a.post_created_date).getTime();
        const dateB = new Date(b.post_created_date).getTime();
        return dateA - dateB; // Sort from oldest to newest
      });
    } else if (sortType === 'latestToOldest') {
      this.showroomData.sort((a, b) => {
        const dateA = new Date(a.post_created_date).getTime();
        const dateB = new Date(b.post_created_date).getTime();
        return dateB - dateA; // Sort from latest to oldest
      });
    }
  
    // Update filterData to reflect the sorted dealershipData
    this.filterData = [...this.showroomData];  // Create a shallow copy of the sorted array
  
    // Manually trigger change detection
    this.cdr.detectChanges();
  
    // Dismiss the popover
    await this.popoverController.dismiss();
  
    // Log filterData to verify sorting
    console.log(this.filterData);
  }
  back() {
    this.router.navigate(['car-home']);
    localStorage.removeItem('selectedcon');
    localStorage.removeItem('selectedcity');
    localStorage.removeItem('selectedCity');
  }
  filter(){
    this.router.navigate(['listing-showroom-filter']);
  }
  fetchshowroomData() {
    // Check if showroom data is already cached
    const cachedShowroomData = localStorage.getItem('showroomData');
    if (cachedShowroomData) {
      // If data is available in cache, use it directly
      this.showroomData = JSON.parse(cachedShowroomData);
      console.log('Using cached showroom data:', this.showroomData);
      this.filterCarData(); // Apply filtering after fetching data
      return;
    }
  
    // Otherwise, fetch data from the backend
    this.userService.getshowroomData().subscribe({
      next: (data: String[]) => {
        this.showroomData = data; // Store fetched showroom data
        // Cache the fetched data in localStorage for future use
        localStorage.setItem('showroomData', JSON.stringify(data));
        console.log('Fetched showroom data:', this.showroomData);
        this.filterCarData(); // Apply filtering after data is fetched
      },
      error: (error: any) => {
        console.error('Error fetching showroom data:', error);
        // Optionally, show an error message to the user
      }
    });
  }
  
 

  filterCarData() {
    // Ensure selected conditions arrays exist and are arrays
    const city = this.selectedcity || [];
    const conditions = this.selectedcon || [];
    console.log('city1  :  ', city);
    console.log('condition1  :  ', conditions);
    this.filterData = this.showroomData.filter(car =>
      car.post_status === 'Active' &&
      (city.length === 0 || city.includes(car.showroom_city)) &&
      (conditions.length === 0 || conditions.includes(car.showroom_featured_type))
    );
  }
  navigateToshowroomSingle(id: string) {
    this.router.navigate(['/showroom-single-view'], {
      queryParams: {
        showroomId: id,
      }
    });
    console.log(id);
  }

}

