
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';

import { LoginComponent } from './login/login.component';
import { NavMineComponent } from './nav-mine/nav-mine.component';
import { OrgListComponent } from './org/org-list/org-list.component';
import { OrgFormComponent } from './org/org-form/org-form.component';


// tried on 12-16 no luck, reversed
import { AngularMaterialModule } from './app.material.module';
// import { AppNeilModule } from './app.neil.module';

// 1-2-21 renamed & new ALL ENTRY
import { EntryFhotoLoaderComponent } from './entry/entry-fhoto-loader/entry-fhoto-loader.component';
import { EntryFhotoEditComponent } from './entry/entry-fhoto-edit/entry-fhoto-edit.component';
import { EntryHomeComponent } from './entry/entry-home/entry-home.component';
import { EntryContentComponent } from './entry/entry-content/entry-content.component';
import { EntryJsontestComponent } from './entry/entry-jsontest/entry-jsontest.component';
import { EntryGoogleComponent } from './entry/entry-google/entry-google.component';
import { AutocompleteComponent } from './entry/google-places/google-places.component';   // is GooglePlaceComponent
import { EntryDetailComponent } from './entry/entry-detail/entry-detail.component';

// 1-2-21 renamed & new ALL REPLY
import { ReplyDetailComponent } from './reply/reply-detail/reply-detail.component';
import { FlaksDetailComponent } from './reply/flaks-detail/flaks-detail.component';
import { FlakContentComponent } from './reply/flak-content/flak-content.component';
import { ReplyHomeComponent } from './reply/reply-home/reply-home.component';
import { ReplyCardComponent } from './reply/reply-card/reply-card.component';
import { FlakFhotoLoaderComponent } from './reply/flak-fhoto-loader/flak-fhoto-loader.component';
import { FlakFhotoEditComponent } from './reply/flak-fhoto-edit/flak-fhoto-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DateInputComponent,
    MemberMessagesComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModalComponent,
    // FlakFlaksComponent,
    LoginComponent,
    // FlakHomeComponent,
    // FlakDetailComponent,
    // FlakCardComponent,

    // added 12-24
    ReplyHomeComponent,
    ReplyCardComponent,

// 1-2-21 renamed and new
    EntryFhotoLoaderComponent,
    EntryFhotoEditComponent,
    EntryHomeComponent,
    EntryContentComponent,
    EntryJsontestComponent,
    EntryGoogleComponent,
    EntryDetailComponent,
    ReplyDetailComponent,
    FlaksDetailComponent,
    FlakContentComponent,
    FlakFhotoLoaderComponent,
    FlakFhotoEditComponent,
    AutocompleteComponent,

    NavMineComponent,
    // EntrysListComponent,
    OrgListComponent,
    // EntrysFormComponent,
    OrgFormComponent,


   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
    AngularMaterialModule,
    // AppNeilModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
