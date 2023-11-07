import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore-side-nav',
  templateUrl: './explore-side-nav.component.html',
  styleUrls: ['./explore-side-nav.component.css']
})

export class ExploreSideNavComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  allTournaments!: any[];
  pageLimit: number = 3;
  currentPage: number = 1;
  totalPages: number = 0;
  totalPagesArray !: number[];

  constructor(private _userService: UserService, private breakpointObserver: BreakpointObserver,private _router:Router) {}

  ngOnInit(): void {
    this.subscription.add(
      this._userService.tournamentsData(this.currentPage, this.pageLimit).subscribe((res) => {
        this.allTournaments = res.tournaments;
        this.totalPages = res.totalPages;
        this.totalPages = res.totalPages; 
        this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
      })
    );
  }

  getLogo(logo: string): string {
    return `${environment.User_API_Key}/files/${logo}`;
  }

  getPoster(poster: string): string {
    return `${environment.User_API_Key}/files/${poster}`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //search tournament
  searchQuery: string = '';
  searchResult: any = [];

  onSearch(): void {

    if (this.searchQuery.length >= 1) {
      this.currentPage = 1
      this.subscription.add(
        this._userService.searchTournament(this.searchQuery,this.currentPage,this.pageLimit).subscribe((res) => {
          this.searchResult = res.tournaments;
          this.allTournaments = res.tournaments;
          this.totalPages = res.totalPages; 
          this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
        })
      );
    } else {
      this.searchResult = [];
      this.ngOnInit()
    }
  }

  onSuggestion(suggestion: string): void {
    this.searchQuery = suggestion;
    this.onSearch();
  }


//pagination

prevPage(): void {
  if (this.currentPage > 1) {
      console.log("Previous page:", this.currentPage - 1);
    this.subscription.add(
      this._userService.tournamentsData( this.currentPage - 1, this.pageLimit).subscribe((res) => {
        this.allTournaments = res.tournaments;
        this.currentPage -= 1;
        this.totalPages = res.totalPages;
        this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
      })
    );
  }
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    console.log("Next page:", this.currentPage + 1);
    this.subscription.add(
      this._userService.tournamentsData( this.currentPage + 1, this.pageLimit).subscribe((res) => {
        this.allTournaments = res.tournaments;
        this.currentPage += 1;
        this.totalPages = res.totalPages;
        this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
      })
    );
  }
}


goToPage(page: number): void {
  if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
    console.log("Selected page:", page);
    this.subscription.add(
      this._userService.tournamentsData( page, this.pageLimit).subscribe((res) => {
        this.allTournaments = res.tournaments;
        this.currentPage = page;
        this.totalPages = res.totalPages;
        this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
      })
    );
  }
}


// Filter and search interconnection
selectionPlayers: string = "";
selectionCategory: string = "";

selectionPlayersChange(option: string) {
  this.currentPage = 1;
  this.selectionPlayers = option;
  this.fetchFilteredTournaments();
}

selectionCategoryChange(option: string) {
  this.currentPage = 1;
  this.selectionCategory = option;
  this.fetchFilteredTournaments();
}

private fetchFilteredTournaments() {
  this.subscription.add(
    this._userService
      .filterTournaments(
        this.selectionPlayers,
        this.selectionCategory,
        this.currentPage,
        this.pageLimit,
        this.startValue,
        this.endValue
      )
      .subscribe((res) => {
        this.allTournaments = res.tournaments;
        this.totalPages = res.totalPages;
        this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
      })
  );
}


sliderValues: number[] = [500, 5000];
startValue: number = 500;
endValue: number = 5000;

priceFilter() {
  console.log('Slider Values: ', this.sliderValues);
  this.startValue = this.sliderValues[0];
  this.endValue = this.sliderValues[1];
  console.log('Start Value: ', this.startValue);
  console.log('End Value: ', this.endValue);
}


chatConnect(managerId:string){
  this.subscription.add(
    this._userService.chatConnect(managerId).subscribe({
      next:()=>{
        this._router.navigate(['/chat'])
      },
      error:(err) =>{
        console.log('something went wrong');
      }
    })

  )
}






}
