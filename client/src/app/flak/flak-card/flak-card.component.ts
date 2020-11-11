import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

import { FlakService } from '../../_services/flak.service';
import { Flak } from '../../_models/flak';

@Component({
  selector: 'app-flak-card',
  templateUrl: './flak-card.component.html',
  styleUrls: ['./flak-card.component.css'],
})

export class FlakCardComponent implements OnInit {
  @Input() flak: Flak;

  constructor(private flakService: FlakService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  // addLike(member: Member) {
  //   this.flakService.addLike(member.username).subscribe(() => {
  //     this.toastr.success('You have liked ' + flak.knownAs);
  //   });
  // }

}
