import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-main-menu-after-login',
    templateUrl: './main-menu-after-login.page.html',
    styleUrls: ['./main-menu-after-login.page.scss'],
    standalone: false
})
export class MainMenuAfterLoginPage implements OnInit {
back() {
this.router.navigate(['/home'])
}

  carDropdownVisible = false;
  BikeDropdownVisible = false;
  commercialDropdownVisible = false;
  machineryDropdownVisible = false;
  plantsDropdownVisible = false;
  dropdownVisible = false;
  userID: string | null;
  userType: string | null;

  constructor(public router: Router) {
    this.userID = sessionStorage.getItem('userId')??'';
    this.userType = sessionStorage.getItem('userType')??'';
      
      if(this.userType==''||this.userID==''){
        this.userType = localStorage.getItem('userType');
        this.userID = localStorage.getItem('userId');
      }
    

   
  }

  ngOnInit() {
    if(this.userType==''||this.userID==''){
      this.userType = localStorage.getItem('userType');
      this.userID = localStorage.getItem('userId');
    }
  }


  navigateToCar(){
    this.router.navigate(['/my-car-ads']);
  }
  navigateToNewCar(){
    this.router.navigate(['/my-car-ads']);
  }
  navigatemybikeads(){
    this.router.navigate(['/bike-you-posted']);
  }
  navigateToBusiness(){
    
    this.router.navigate(['/your-business']);
  }
  navigateToBikeBusiness(){
    
    this.router.navigate(['/bike-busenesses']);
  }
  navigateToForSale(){
    this.router.navigate(['/for-sale']);
  }
  navigateToForBikeSale(){
    this.router.navigate(['/bike-sale-listing']);
  }
  navigateToForHire(){
    this.router.navigate(['/for-hire']);
  }
  navigateToPostSale(){
    this.router.navigate(['/car-sale-post']);
  }
  navigateToPostBikeSale(){
    this.router.navigate(['/bike-post-sale']);
  }
  navigateToPostHire(){
    this.router.navigate(['/car-hire']);
  }
  navigateToDealer(){
    this.router.navigate(['/listing-dealer']);
  }
  navigateToBikeDealer(){
    this.router.navigate(['/listing-bike-dealer']);
  }
  navigateToShowroom(){
    this.router.navigate(['/listing-showroom']);
  }
  navigateToBikeShowroom(){
    this.router.navigate(['/listing-bike-showroom']);
  }
  navigateToImporter(){
    this.router.navigate(['/listing-importer']);
  }
  navigateToBikeImporter(){
    this.router.navigate(['/listing-bike-importer']);
  }
  navigateToExporter(){
    this.router.navigate(['/listing-exporter']);
  }
  navigateToBikeExporter(){
    this.router.navigate(['/listing-bike-exporter']);
  }
  navigateToInsurance(){
    this.router.navigate(['/listing-insurance']);
  }
  navigateToBikeInsurance(){
    this.router.navigate(['/listing-bike-insurance']);
  }
  navigateToLeasing(){
    this.router.navigate(['/listing-leasing']);
  }
  navigateToBikeLeasing(){
    this.router.navigate(['/listing-bike-leasing']);
  }
  navigateToWorkshop(){
    this.router.navigate(['/listing-workshop']);
  }
  navigateToBikeWorkshop(){
    this.router.navigate(['/listing-bike-workshop']);
  }
  navigateToSchool(){
    this.router.navigate(['/listing-drv-school']);
  }

  toggleCarDropdown() {
    this.carDropdownVisible = !this.carDropdownVisible;
  }
  toggleBikeDropdown() {
    this.BikeDropdownVisible = !this.BikeDropdownVisible;
  }
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
  goToWallet(){
    this.router.navigate(['/wallet-bundles']);
  }
  goToProfile(){
    if (this.userType === 'Trader'){
      this.router.navigate(['/account-prof-busines']);
    }
    else{
      this.router.navigate(['/account-prof-pvt']);
    }
  }

  toggleCommercialDropdown() {
    this.commercialDropdownVisible = !this.commercialDropdownVisible;
  }

  toggleMachineryDropdown() {
    this.machineryDropdownVisible = !this.machineryDropdownVisible;
  }

  togglePlantsDropdown() {
    this.plantsDropdownVisible = !this.plantsDropdownVisible;
  }

  navigateToCommercialSale() {
    this.router.navigate(['/commercial-sale']);
  }

  navigateToCommercialHire() {
    this.router.navigate(['/commercial-hire']);
  }

  navigateToCommercialShowroom() {
    this.router.navigate(['/commercial-showroom']);
  }

  navigateToCommercialDealer() {
    this.router.navigate(['/commercial-dealer']);
  }

  navigateToCommercialWorkshop() {
    this.router.navigate(['/commercial-workshop']);
  }

  navigateToCommercialImporter() {
    this.router.navigate(['/commercial-importer']);
  }

  navigateToCommercialExporter() {
    this.router.navigate(['/commercial-exporter']);
  }

  navigateToCommercialInsurance() {
    this.router.navigate(['/commercial-insurance']);
  }

  navigateToCommercialLeasing() {
    this.router.navigate(['/commercial-leasing']);
  }

  navigateToMachinerySale() {
    this.router.navigate(['/machinery-sale']);
  }

  navigateToMachineryHire() {
    this.router.navigate(['/machinery-hire']);
  }

  navigateToMachineryShowroom() {
    this.router.navigate(['/machinery-showroom']);
  }

  navigateToMachineryDealer() {
    this.router.navigate(['/machinery-dealer']);
  }

  navigateToMachineryWorkshop() {
    this.router.navigate(['/machinery-workshop']);
  }

  navigateToMachineryImporter() {
    this.router.navigate(['/machinery-importer']);
  }

  navigateToMachineryExporter() {
    this.router.navigate(['/machinery-exporter']);
  }

  navigateToMachineryInsurance() {
    this.router.navigate(['/machinery-insurance']);
  }

  navigateToMachineryLeasing() {
    this.router.navigate(['/machinery-leasing']);
  }

  navigateToPlantsSale() {
    this.router.navigate(['/plants-sale']);
  }

  navigateToPlantsHire() {
    this.router.navigate(['/plants-hire']);
  }

  navigateToPlantsShowroom() {
    this.router.navigate(['/plants-showroom']);
  }

  navigateToPlantsDealer() {
    this.router.navigate(['/plants-dealer']);
  }

  navigateToPlantsWorkshop() {
    this.router.navigate(['/plants-workshop']);
  }

  navigateToPlantsImporter() {
    this.router.navigate(['/plants-importer']);
  }

  navigateToPlantsExporter() {
    this.router.navigate(['/plants-exporter']);
  }

  navigateToPlantsInsurance() {
    this.router.navigate(['/plants-insurance']);
  }

  navigateToPlantsLeasing() {
    this.router.navigate(['/plants-leasing']);
  }

  logout() {
    // Clear session storage
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userType');
    
    // Clear local storage
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    
    // Reset the component variables
    this.userID = null;
    this.userType = null;
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }

}

