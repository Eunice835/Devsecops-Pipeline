variable "aws_region" {
  description = "AWS region for ECS deployment."
  type        = string
  default     = "us-east-1"
}

variable "vpc_id" {
  description = "VPC ID for ECS service."
  type        = string
}

variable "subnet_ids" {
  description = "Subnet IDs for ECS service networking."
  type        = list(string)
}

variable "container_image" {
  description = "Container image URI for the app."
  type        = string
  default     = "public.ecr.aws/docker/library/node:18-alpine"
}

variable "enable_insecure_lab" {
  description = "Enable intentionally insecure Terraform resources for security-lab scanning."
  type        = bool
  default     = true
}
