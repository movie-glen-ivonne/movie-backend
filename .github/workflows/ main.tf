provider "google" {
  project = var.project_id
  region  = var.region
}

# Check if the VPC exists, if not create it
resource "google_compute_network" "this" {
  count  = length(data.google_compute_networks.this) == 0 ? 1 : 0  # Only create if it doesn't exist
  name   = "vpc-movies"
  auto_create_subnetworks = true
}

# Data source to check if the VPC exists
data "google_compute_networks" "this" {
  project = var.project_id
}

# Create the VPC Access Connector if it doesn't exist
resource "google_vpc_access_connector" "this" {
  name    = var.vpc_connector_name
  region  = var.region
  network = google_compute_network.this.name

  # Egress settings to control traffic
  egress_settings = "ALL_TRAFFIC"
}


# Data source to check if the VPC Access Connector exists
data "google_vpc_access_connectors" "this" {
  project = var.project_id
  region  = var.region
}

# IAM Binding to allow Cloud Run to access Cloud SQL (if it doesn't exist)
resource "google_project_iam_binding" "cloud_run_sql_access" {
  count  = length(data.google_project_iam_bindings.cloud_run_sql_access) == 0 ? 1 : 0  # Only create if it doesn't exist
  project = var.project_id

  role = "roles/cloudsql.client"

  members = [
    "serviceAccount:${var.cloud_run_service_account}",
  ]
}

# Data source to check if the IAM Binding for Cloud Run exists
data "google_project_iam_bindings" "cloud_run_sql_access" {
  project = var.project_id
  role    = "roles/cloudsql.client"
}
