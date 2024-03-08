From https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines

<type>(<scope>): <subject>

Type:

build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
docs: Documentation only changes
feat: A new feature
fix: A bug fix
perf: A code change that improves performance
refactor: A code change that neither fixes a bug nor adds a feature
style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
test: Adding missing tests or correcting existing tests
Scope (optional):

The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages.
Subject:

succinct description of the change
use the imperative, present tense: "change" not "changed" nor "changes"
don't capitalize the first letter
no dot (.) at the end