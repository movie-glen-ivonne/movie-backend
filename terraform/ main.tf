provider "google" {
  project = var.project_id
  region  = var.region
}

# Conditionally create the VPC Access Connector if it doesn't exist
resource "google_vpc_access_connector" "new_connector" {
  name          = "vpc-connector-movies"
  region         = var.region
  network        = "default"
  ip_cidr_range  = "10.8.0.0/28"
  min_instances = 2
  max_instances = 3
}

# Create the IAM Binding for Cloud Run to access Cloud SQL
resource "google_project_iam_binding" "cloud_run_sql_access" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  members = [
    "serviceAccount:${var.cloud_run_service_account}",
  ]
}
