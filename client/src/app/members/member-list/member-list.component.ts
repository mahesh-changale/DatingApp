import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {
  members$: Observable<Member[]> | undefined;
  // pagination: Pagination | undefined;
  // userParams: UserParams | undefined;
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }]

  constructor(private memberService: MembersService) { 
   // this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
     this.members$ = this.memberService.getMembers();
    this.loadMembers()
  }

  loadMembers() {
    // this.memberService.getMembers().subscribe({
    //   next: members =>this.members = members
    // });
    
    // if (this.userParams) {
    //   this.memberService.setUserParams(this.userParams);
    //   this.memberService.getMembers(this.userParams).subscribe({
    //     next: response => {
    //       if (response.result && response.pagination) {
    //         this.members = response.result;
    //         this.pagination = response.pagination;
    //       }
    //     }
    //   })
    // }
  }

  // resetFilters() {
  //   this.userParams = this.memberService.resetUserParams();
  //   this.loadMembers();
  // }

  // pageChanged(event: any) {
  //   if (this.userParams && this.userParams?.pageNumber !== event.page) {
  //     this.memberService.setUserParams(this.userParams);
  //     this.userParams.pageNumber = event.page;
  //     this.loadMembers();
  //   }
  // }
  
}
