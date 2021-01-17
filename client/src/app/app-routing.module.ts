import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { MemberDetailedResolver } from './_resolvers/member-detailed.resolver';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminGuard } from './_guards/admin.guard';

import { OrgListComponent } from './org/org-list/org-list.component';
// add 12-23
import { FlakDetailedResolver } from './_resolvers/flak-detailed.resolver';


// 1-2-21 renamed & new ALL ENTRY
// import { EntryFhotoLoaderComponent } from './entry/entry-fhoto-loader/entry-fhoto-loader.component';
// import { EntryFhotoEditComponent } from './entry/entry-fhoto-edit/entry-fhoto-edit.component';
import { EntryHomeComponent } from './entry/entry-home/entry-home.component';
import { EntryContentComponent } from './entry/entry-content/entry-content.component';
// import { EntryJsontestComponent } from './entry/entry-jsontest/entry-jsontest.component';
import { EntryGoogleComponent } from './entry/entry-google/entry-google.component';
import { AutocompleteComponent } from './entry/google-places/google-places.component';   // is GooglePlaceComponent
import { EntryDetailComponent } from './entry/entry-detail/entry-detail.component';
import { EntryFhotoResolver } from './_resolvers/entry-fhoto.resolver';

// 1-2-21 renamed & new ALL REPLY
import { ReplyDetailComponent } from './reply/reply-detail/reply-detail.component';
import { FlaksDetailComponent } from './reply/flaks-detail/flaks-detail.component';
import { FlakContentComponent } from './reply/flak-content/flak-content.component';
import { ReplyHomeComponent } from './reply/reply-home/reply-home.component';
import { ReplyCardComponent } from './reply/reply-card/reply-card.component';
import { FlakFhotoLoaderComponent } from './reply/flak-fhoto-loader/flak-fhoto-loader.component';
import { FlakFhotoEditComponent } from './reply/flak-fhoto-edit/flak-fhoto-edit.component';
import { FlaksDetailResolver } from './_resolvers/flaks-detail.resolver';
import { ReplyDetailResolver } from './_resolvers/reply-detail.resolver';

// import { EntryFhotoLoader21Component } from './entry/entry-fhoto-loader21/entry-fhoto-loader21.component';
import { EntryFhotoEdit21Component } from './entry/entry-fhoto-edit21/entry-fhoto-edit21.component';

import { EntryFhotoComponent } from './entry/entry-fhoto/entry-fhoto.component';
import { ReplyFhotoEditComponent } from './reply/reply-fhoto-edit/reply-fhoto-edit.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent},
      {path: 'members/:username', component: MemberDetailComponent, resolve: {member: MemberDetailedResolver}},
      {path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'lists', component: ListsComponent},
      {path: 'messages', component: MessagesComponent},

      // added 11/15
      {path: 'orgs', component: OrgListComponent},

      // modified 12-16 from entrys to entry (no s) with google copied from ggmapext
      {path: 'entry', component: EntryHomeComponent},
      {path: 'google', component: EntryGoogleComponent},
      {path: 'content', component: EntryContentComponent},
      {path: 'fhoto', component: EntryFhotoComponent},
      // {path: 'efhoto/:id', component: EntryFhotoEdit21Component, resolve: {entry: EntryFhotoResolver}},
      {path: 'edetail', component: EntryDetailComponent},

   // added 12-24
      {path: 'replycards', component: ReplyHomeComponent},
      // 01-15-21
      {path: 'reply/:id', component: ReplyFhotoEditComponent, resolve: {entry: ReplyDetailResolver}},
      // {path: 'reply/:id', component: ReplyDetailComponent, resolve: {entry: ReplyDetailResolver}},

   // 12-28
      {path: 'flak/:id', component: FlaksDetailComponent, resolve: {entry: FlaksDetailResolver}},
   // 01-04-21
      // {path: 'fhoto', component: EntryFhotoEdit21Component},



      {path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard]},
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
