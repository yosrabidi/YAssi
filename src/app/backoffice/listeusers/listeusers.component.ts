import { Component } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listeusers',
  templateUrl: './listeusers.component.html',
  styleUrls: ['./listeusers.component.css']
})
export class ListeusersComponent {
  searchTerm: string = '';
  showBlocked: boolean = false; // Added property to track whether to show blocked users

 users:any =[]; 
 originalUsers: any[] = []; // Store the original list of users

  constructor(private userserv:UserService){
    this.userserv.getUsers().subscribe({
 
      next: (users) => {
        this.users = users;
        this.originalUsers = users.slice(); // Copy the users to originalUsers
         console.log(this.originalUsers)
      },
      error: (err) => {
        console.log(err);
      },
  });

}

toggleBlock(userId: number, blocked: boolean): void {
  const action = blocked ? 'unblock' : 'block';
  const serviceMethod = blocked ? this.userserv.unblockUser : this.userserv.blockUser;
  Swal.fire({
    title: `Are you sure you want to ${action} this user?`,
    text: `You won't be able to revert this!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, proceed!'
  }).then((result) => {
    if (result.isConfirmed) {
      // Call the appropriate service method based on the action
      serviceMethod.call(this.userserv, userId).subscribe((user) => {
        // Update the user's blocked status in the local list
        const index = this.users.findIndex((u: any) => u.id === userId);
        if (index !== -1) {
          this.users[index].blocked = !blocked;
        }

        Swal.fire({
          title: 'Success!',
          text: `${user.name} ${blocked ? 'unblocked' : 'blocked'} successfully`,
          icon: 'success',
          timer: 2000
        });
      });
    }
  });
  
}
block(userId: number){
  console.log(userId);
this.userserv.blockUser(userId).subscribe({
 
  next: (user) => {
    if(user){
      Swal.fire({
        title: 'succes!',
        text: user.name +' blocked successfully',
        icon: 'success',
        timer: 2000 // Set the duration in milliseconds (e.g., 3000ms = 3 seconds)
      });
    }
 
  },
  error: (err) => {
    console.log(err);
    Swal.fire({
      title: 'error!',
      text: 'Error Internal server ',
      icon: 'error',
      timer: 2000 // Set the duration in milliseconds (e.g., 3000ms = 3 seconds)
    });
  },
});



}
Remove(userId: number){
  // Use SweetAlert for confirmation
  Swal.fire({
    title: 'Are you sure ?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      // Perform the delete operation
      console.log(`Removing user with ID: ${userId}`);
      // Call your actual remove logic here
      this.userserv.deleteUser(userId).subscribe(()=>{
         Swal.fire({
          title: ' Deleted ',
          text: 'user is Deleted',
          icon: 'success',
          timer : 2000
         });
         const index = this.users.findIndex((user:any)  => user.id === userId);
         if (index !== -1) {
           this.users.splice(index, 1);
         }
      })
    }
  });
}

isRoleAdmin(roles: any[]): boolean {
  // Check if 'ADMIN' role exists in the user's roles
  return roles.some(role => role.name != 'ADMIN');
}

downloadPdf() {
  this.userserv.exportPdf().subscribe(response => {
    this.downloadFile(response);
  });
}

private downloadFile(response: any) {
  const blob = new Blob([response.body], { type: 'application/pdf' });
  const downloadLink = document.createElement('a');
  const url = window.URL.createObjectURL(blob);

  downloadLink.href = url;
  downloadLink.download = 'user.pdf';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  window.URL.revokeObjectURL(url);
}

getStatusLabel(stateuser: boolean): string {
  return stateuser ? 'Completed' : 'In Progress';
}


filterUsers() {
  if (this.searchTerm.trim() === '') {
    // If the search term is empty, restore the original list
    this.users = this.originalUsers.slice();
  } else {
    
    // Filter the users based on the search term
    this.users = this.originalUsers.filter((user: any) =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.tel.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.roles.some((role: any) => role.name.toLowerCase().includes(this.searchTerm.toLowerCase()))||
      this.getStatusLabel(user.stateuser).toLowerCase().includes(this.searchTerm.toLowerCase()) 
      );
  }

}



}
