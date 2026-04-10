output "ecs_cluster_name" {
  value = aws_ecs_cluster.this.name
}

output "ecs_service_name" {
  value = aws_ecs_service.app.name
}

output "ecs_security_group_id" {
  value = aws_security_group.ecs_service_sg.id
}

output "ecr_repository_url" {
  value = aws_ecr_repository.app.repository_url
}
