# Cum am contribuit

Fiecare am luat ultima versiune de pe master folosind comenzile:

git clone  https://github.com/beatricedia/SeAN.git
git checkout -b branch_name

Am facut fiecare paginile asignate la pregatirea strategiei de lucru si le-am adaugat in branc-ul nostru prin commit-uri.

git add .
git commit -m "mesajul prin care spunem ce s-a modificat/adaugat"
git push origin branh_name
 
Propunerea de modificari a fost facuta pe branch-ul nostru. Odata impartasite si cazand de acord, am folosit comanda:

git merge branch1 into branch2
sau
git pull origin branc_name

In cazul in care unul din contribuitori schimba ceva in branch-ul celuilalt, modificarile erau preluate prin:

git fetch origin branch_name

Dupa ce modificarile erau facute, puneam totul pe master, actualizand-ul cu ultima versiune a codului.

git merge branch1 into master
sau
git pull origin branc_name 