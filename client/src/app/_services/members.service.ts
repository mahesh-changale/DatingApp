import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  // baseUrl = environment.apiUrl;
  // hubUrl = environment.hubUrl;
  baseUrl = 'https://localhost:5001/api/';
  // private hubConnection?: HubConnection;
  // private messageThreadSouce = new BehaviorSubject<Message[]>([]);
  //messageThread$ = this.messageThreadSouce.asObservable();

  members: Member[] = [];
  memberCache = new Map();
  user?: User | null;
 // userParams: UserParams | undefined;

  constructor(private http: HttpClient) { }


  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(username: string) {
    
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.userName === username);

    if (member) return of(member);
    
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member }
      })
    )
  }

  // getMessages(pageNumber: number, pageSize: number, container: string) {
  //   let params = getPaginationHeaders(pageNumber, pageSize);
  //   params = params.append('Container', container);
  //   return getPaginatedResult<Message[]>(this.baseUrl + 'messages', params, this.http);
  // }

  // getMessageThread(username: string) {
  //   return this.http.get<Message[]>(this.baseUrl + 'messages/thread/' + username);
  // }

  // async sendMessage(username: string, content: string) {
  //   return this.hubConnection?.invoke('SendMessage', { recipientUsername: username, content })
  //     .catch(error => console.log(error));
  // }

  deleteMessage(id: number) {
    return this.http.delete(this.baseUrl + 'messages/' + id);
  }

}
