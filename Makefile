.PHONY: check pep8 pyflakes dist i18n assets

all: check

check: pep8 pyflakes

pep8:
	pep8 --exclude=.git,cache,docs --ignore=E123,E126,E128,E251 --max-line-length 120 .

pyflakes:
	rm -Rf cache/templates/
	pyflakes .

i18n:
	@tx pull
	@cd askbot_etalab && ../manage.py makemessages -a && ../manage.py makemessages -a -d djangojs
	@tx push -s -t

updatei18n:
	@tx pull
	@cd askbot_etalab && ../manage.py compilemessages

dist: assets
	@python setup.py clean
	@python setup.py sdist

assets:
	@bower install
	@grunt dist
	@cd askbot_etalab && ../manage.py compilemessages
