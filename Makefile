.PHONY: install serve deploy

HUGO_VERSION=0.123.7

install:
	@command -v hugo >/dev/null 2>&1 || { \
		echo "Installing hugo $(HUGO_VERSION)..."; \
		curl -L https://github.com/gohugoio/hugo/releases/download/v$(HUGO_VERSION)/hugo_extended_$(HUGO_VERSION)_linux-amd64.tar.gz | tar -xz && \
		sudo mv hugo /usr/local/bin/hugo; \
	}

serve:
	hugo server -w

deploy:
	./scripts/deploy.sh
