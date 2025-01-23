terraform {
  required_version = ">=1.2.0"
  required_providers {
    aws = {
      version = ">=4.30.0"
    }
  }
  backend "s3" {
    bucket = "nestjs-app-terraform-states-03"
    region = "us-east-1"
    acl    = "bucket-owner-full-control"
    key    = "apps/ec2-es2-aluguel.tfstate"
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "es2-aluguel" {
  name_prefix = "es2-aluguel-sg"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

data "aws_iam_policy_document" "instance_assume_role_policy" {
  statement {
    actions   = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "es2-aluguel_role" {
  name = "es2_aluguel"
  assume_role_policy  = data.aws_iam_policy_document.instance_assume_role_policy.json
}

resource "aws_iam_role_policy_attachment" "es2-aluguel_role_policy_attachment" {
  role       = aws_iam_role.es2-aluguel_role.name
  policy_arn = aws_iam_policy.es2-aluguel_role_policy.arn
}

resource "aws_iam_policy" "es2-aluguel_role_policy" {
  name = "es2-aluguel_role_policy"
  policy = jsonencode({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "secretsmanager:DescribeSecret",
          "secretsmanager:GetSecretValue",
          "secretsmanager:ListSecrets",
          "secretsmanager:ListSecretVersionIds"
        ],
        Resource: "arn:aws:secretsmanager:us-east-1:940482447113:secret:prod/es2-aluguel-dqN7P7"
      },
      {
        "Effect": "Allow",
        "Action": "secretsmanager:ListSecrets",
        "Resource": "*"
      }
    ],
  })
}

resource "aws_iam_instance_profile" "es2-aluguel_role_profile" {
  name = "es2-aluguel_role_profile"
  role = "${aws_iam_role.es2-aluguel_role.name}"
}

resource "aws_instance" "es2-aluguel" {
  ami           = "ami-006dcf34c09e50022"
  instance_type = "t2.micro"
  key_name      = "es2-aluguel"
  iam_instance_profile = "${aws_iam_instance_profile.es2-aluguel_role_profile.name}"
  vpc_security_group_ids = [aws_security_group.es2-aluguel.id]
  user_data = base64encode(templatefile("setup.sh.tpl", {
    COMMIT = local.commit
  }))
  user_data_replace_on_change = true
  lifecycle {
    create_before_destroy = true
  }
  tags = {
    Name = "es2-aluguel"
  }
}

resource "aws_eip" "es2-aluguel" {
  instance = aws_instance.es2-aluguel.id
}

output "elastic_ip" {
  value = aws_eip.es2-aluguel.public_ip
}

output "app_image" { value = "${local.docker_image}:${local.commit}"}