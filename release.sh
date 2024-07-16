#!/usr/bin/env bash

set -o errexit -o nounset -o pipefail

BASENAME=$(basename "$0")
CANONICAL_SCRIPT=$(${READLINK_BIN:-readlink} -e "$0")

exit_with_usage() {
	cat <<EOF
${BASENAME} <command> [<environment>]

available commands:
install                     Install needed npm packages
start_storybook             Start Storybook to test UI component in isolation. More information: https://docs.keycloakify.dev/testing-your-theme/in-storybook
start_keycloak              Start Keycloak to test theme in a real Keycloak environment.
add_template                Add a keycloak page / template that you like to customize
add_story                   Add a page / template to the storybook, for life preview.

EOF
	exit 1
}

install() {
  yarn install
}

start_storybook() {
  npm run storybook
}

start_keycloak() {
  npx keycloakify start-keycloak
}

add_template() {
  npx keycloakify eject-page
}

add_story() {
  npx keycloakify add-story
}

build_theme() {
  yarn build-keycloak-theme
}

OPERATION=${1:-}

case ${OPERATION} in
install)
  install
  ;;
start_storybook)
	start_storybook
	;;
start_keycloak)
	start_keycloak
	;;
add_template)
	add_template
	;;
add_story)
	add_story
	;;
*)
	exit_with_usage
	;;
esac