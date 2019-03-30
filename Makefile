DOCKER := docker
DOCKER_REGISTRY_HOST := harbor.local.site.com

################################################################################
# You MUST specify variables below before building the docker image.
#
IMAGE_NAME := jerry-boilerplate
IMAGE_VERSION := $(shell git rev-parse HEAD)
#
################################################################################

################################################################################
# Optional configurations
#
IMAGE_NAMESPACE := boilerplate

IMAGE_REPO      := $(DOCKER_REGISTRY_HOST)/$(IMAGE_NAMESPACE)/$(IMAGE_NAME)
IMAGE_FULL_NAME := $(IMAGE_REPO):$(IMAGE_VERSION)
IMAGE_APP_NAME  :=$(IMAGE_REPO):node-app
CONTAINER := $(IMAGE_NAMESPACE)

LOC_PATH:=$(dir $(abspath $(lastword $(MAKEFILE_LIST))))

## Nginx Config
NGINX_FLAG = \
  -p 5566:80 \
  -p 443:443 \
#
################################################################################

# If the first argument is "run"...
ifeq (run,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "run"
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(RUN_ARGS):;@:)
endif


.PHONY: help
help:
	@echo "Usage:"
	@echo "    make <target>"
	@echo
	@echo "Targets:"
	@echo "    build"
	@echo "        Build docker image."
	@echo
	@echo "    clean"
	@echo "        Remove docker image."
	@echo
	@echo "    exec (CMD=<cmd>)"
	@echo "        Create container and execute specified command (default: bash)."
	@echo
	@echo "    run"
	@echo "        Create container and perform task."
	@echo

.PHONY: build
build:
	$(DOCKER) build -f ./docker/App.Dockerfile -t $(IMAGE_APP_NAME) .



.PHONY: clean
clean:
	$(DOCKER) rmi $(IMAGE_FULL_NAME) || true
	$(DOCKER) rmi $(IMAGE_NAME) || true

.PHONY: test
test:
	$(DOCKER) run \
		--rm \
		--entrypoint /usr/src/app/docker/entrypoint-test.sh \
		$(IMAGE_APP_NAME)

.PHONY: pull
pull:
	$(DOCKER) pull $(IMAGE_FULL_NAME) || true

.PHONY: rm
rm:
	$(DOCKER) rm -f $(CONTAINER)

.PHONY: run
run:
	$(DOCKER) rm -f $(CONTAINER) || true
	$(DOCKER) run \
		-d --name $(CONTAINER) \
		$(NGINX_FLAG) \
		--restart always \
		$(IMAGE_FULL_NAME)
