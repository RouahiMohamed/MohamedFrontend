import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VirtualMachineComponent } from './virtual-machine/virtual-machine.component';
import { VirtualNetworkComponent } from './virtual-network/virtual-network.component';
import { SubnetComponent } from './subnet/subnet.component';
import { RessourceGroupComponent } from './ressource-group/ressource-group.component';
import { VmssComponent } from './vmss/vmss.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ApplicationGatewayComponent } from './application-gateway/application-gateway.component';

import { OsMachineComponent } from './Admin/os-machine/os-machine.component'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AddOsMachineComponent } from './Admin/add-os-machine/add-os-machine.component';
import { UpdateOsMachineComponent } from './Admin/update-os-machine/update-os-machine.component';
import { AddRegionComponent } from './Admin/add-region/add-region.component';
import { UpdateRegionComponent } from './Admin/update-region/update-region.component';
import { RegionComponent } from './Admin/region/region.component';
import { DiskComponent } from './Admin/disk/disk.component';
import { UpdateDiskComponent } from './Admin/update-disk/update-disk.component';
import { AddDiskComponent } from './Admin/add-disk/add-disk.component';
import { MatIconModule } from '@angular/material/icon';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ArchitectureDesignComponent } from './architecture-design/architecture-design.component';
import { ArchitComponent } from './archit/archit.component';
import {NgxWebstorageModule } from 'ngx-webstorage';
import { ListArchitComponent } from './list-archit/list-archit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { TerraformCodeDialogComponent } from './terraform-code-dialog/terraform-code-dialog.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MyListComponent } from './my-list/my-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    LandingpageComponent,
    DashbordComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    VirtualMachineComponent,
    VirtualNetworkComponent,
    SubnetComponent,
    RessourceGroupComponent,
    VmssComponent,
    ApplicationGatewayComponent,
    OsMachineComponent,
    AddOsMachineComponent,
    UpdateOsMachineComponent,
    AddRegionComponent,
    UpdateRegionComponent,
    DiskComponent,
    UpdateDiskComponent,
    AddDiskComponent,
    RegionComponent,
    SidebarComponent,
    ArchitectureDesignComponent,
    ArchitComponent,
    ListArchitComponent,
    TerraformCodeDialogComponent,
    MyListComponent,
   
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule ,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    DragDropModule,
    DialogModule,
    DynamicDialogModule,
    ToastModule,
    MdbModalModule,
    DropdownModule,
    NgApexchartsModule,
    NgxWebstorageModule.forRoot(),
  ],
  providers: [httpInterceptorProviders, provideAnimationsAsync(),MdbModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }