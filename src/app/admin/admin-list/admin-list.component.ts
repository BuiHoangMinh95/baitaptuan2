import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls:['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  admins: any[] = [];
  isAddAdminFormOpen = false;
  isEditAdminFormOpen = false;
  addAdminForm: FormGroup;
  editAdminForm: FormGroup;
  selectedAdminId!: string | null;

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.addAdminForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.editAdminForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.adminService.getAdmins().subscribe(
      (data) => {
        this.admins = data;
      },
      (error) => {
        console.error('Error loading admins:', error);
      }
    );
  }

  openAddAdminForm() {
    this.isAddAdminFormOpen = true;
  }

  closeAddAdminForm() {
    this.isAddAdminFormOpen = false;
    this.addAdminForm.reset();
  }

  addAdmin() {
    if (this.addAdminForm.valid) {
      const adminData = this.addAdminForm.value;
      this.adminService.addAdmin(adminData).subscribe(
        () => {
          this.loadAdmins();
          this.closeAddAdminForm();
        },
        (error) => {
          console.error('Error adding admin:', error);
        }
      );
    }
  }

  openEditAdminForm(adminId: string) {
    const selectedAdmin = this.admins.find((admin) => admin.id === adminId);
    if (selectedAdmin) {
      this.selectedAdminId = adminId;
      this.editAdminForm.setValue({
        username: selectedAdmin.username,
        password: selectedAdmin.password,
        email: selectedAdmin.email,
        fullName: selectedAdmin.fullName,
        phoneNumber: selectedAdmin.phoneNumber,
        address: selectedAdmin.address,
      });
      this.isEditAdminFormOpen = true;
    }
  }

  closeEditAdminForm() {
    this.selectedAdminId = null;
    this.isEditAdminFormOpen = false;
    this.editAdminForm.reset();
  }

  editAdmin() {
    if (this.editAdminForm.valid && this.selectedAdminId !== null) {
      const adminData = this.editAdminForm.value;
      this.adminService.editAdmin(this.selectedAdminId, adminData).subscribe(
        () => {
          this.loadAdmins();
          this.closeEditAdminForm();
        },
        (error) => {
          console.error('Error editing admin:', error);
        }
      );
    }
  }

  deleteAdmin(adminId: string) {
    this.adminService.deleteAdmin(adminId).subscribe(
      () => {
        this.loadAdmins();
      },
      (error) => {
        console.error('Error deleting admin:', error);
      }
    );
  }
}
