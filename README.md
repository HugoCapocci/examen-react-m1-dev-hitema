Examen React M1-Dev Hitema : Timer App (Countdown)
==================================================

Méthode à suivre :
------------------
  * Forkez ce repository
  * Clonez **votre** repository forké (N'oubliez pas de faire `npm install` après...)
  * Créez votre branche (`git checkout -b prenom-nom`) de travail
  * Faites régulièrement des commits
  * Pusher votre branche puis créez une Pull Request (n'attendez pas la fin !)

Supports :
----------

=> Support React : https://docs.google.com/presentation/d/1sI-mokDbh27AXUhPBrmrdnbtRhfeayUHzVmu3Ki0RHY/edit?usp=sharing

=> Support TypeScript : https://docs.google.com/presentation/d/1TFGp_eKQyYPtpO18ROCeszZi6z0CqqFPgvnxIY50InA/edit?usp=sharing

Consignes :
-----------

=> **Résultat final attendu** : https://react-m1-dev-hitema.herokuapp.com/

1. Dans le composant Timer, Implémenter les méthodes onInputChange & onBlur, permettant de saisir le décompte des heures, minutes et secondes
  * Seuls des chiffres peuvent être saisis
  * Si on ne saisit qu'un chiffre, il doit être préfixé d'un zéro
  * Le compteur d'heures ne peut pas être supérieur à 99
  * Le compteur de minutes ou de secondes ne peut pas être supérieur à 59

> 'blur' est l'inverse du focus. L'événement est déclenché lorsque l'utilisateur quitte l'élément

2. Actions redux :
  * Dans le fichier `actions/timer-actions.ts`, créer les méthodes d'actions, en utilisant les types définis dans le fichier `action-types/timer-action-types.ts`
  * Dans le composant Controls:
    * Gérer les condition d'affichage des différents butons autres que le bouton START (STOP, PAUSE, RESUME) en fonction du *status* (this.props.status)
    * Mapper les **actions** sur les différents boutons

3. Store
  * Connecter l'application au store
  * Implémenter la fonction reducer dans le store
  * Connecter le Composant Timer au store, pour récupérer le status. Noralement, le bouton 'START' devrait alors déclencer le timer, si un temps a été saisi.
  * Quand le timer du composant Timer est terminé, il faut changer l'état du store.
  * Gérer également le cas ou on appuie sur START mais que aucun temps n'a été saisi.

BONUS
-----

 *  Remplacer l'icone en forme de sablier par un Composant affichant une icone différente selon l'état du store.
