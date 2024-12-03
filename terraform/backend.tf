terraform {
  backend "gcs" {
    bucket = "terraform-state-bucket-sandbox-project-443508" 
    prefix = "terraform/state" 
  }
}
