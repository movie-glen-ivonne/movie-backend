variable "project_id" {
  description = "The Google Cloud project ID"
  type        = string
}

variable "region" {
  description = "The region to deploy resources"
  type        = string
}

variable "vpc_name" {
  description = "The name of the VPC network"
  type        = string
  default = "vpc-movies"
}

variable "vpc_connector_name" {
  description = "The name of the VPC Access Connector"
  type        = string
  default = "vpc-connector-movies"
}

variable "cloud_sql_instance_connection_name" {
  description = "The Cloud SQL instance connection name"
  type        = string
}

variable "cloud_run_service_account" {
  description = "The service account used by Cloud Run"
  type        = string
}
