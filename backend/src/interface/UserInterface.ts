interface UserBody {
  first_name: string,
  last_name: string,
  phone?: string,
  email: string,
  password: string,
  confirm_password?: string,
}

export default UserBody