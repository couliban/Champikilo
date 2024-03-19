import { Type } from "@angular/core"
import { VingtEtUnComponent } from "../components/vingt-et-un/vingt-et-un.component"
import { HuitAmericainsComponent } from "../components/huit-americains/huit-americains.component"
import { BatailleComponent } from "../components/bataille/bataille.component"

type game = {
    name: string,
    path: string,
    component?: Type<any>,
    image?: string;
    description?: string;
}

export const games: game[] = [
    {
        name: "Vingt-et-un",
        path: "Vingt-et-un",
        component: VingtEtUnComponent,
        image: "Blackjack21.jpg",
        description: `<p>
                    Le jeu de 21 est un jeu traditionnel de La Réunion. 
                    Il se joue avec un jeu de 52 cartes, 
                    et le gagnant est celui qui a récolté le plus de points en totalisant ses cartes, 
                    parmi les joueurs non éliminés. 
                    Sont éliminés les joueurs ayant plus de 21 points (d'où le nom du jeu).
                    <br><br>
                    Chaque joueur tire une ou plusieurs cartes pour s'approcher de 21, 
                    ou décide de ne pas tirer. Dès que le point obtenu dépasse 21, le joueur a perdu. 
                    <br><br>
                    <strong>Dans ce jeu, le nombre maximal de cartes que peut piocher chaque joueur est 6</strong>
                    <br><br>
                    <strong> Valeur des cartes
                    <ul>
                        <li>As: 11</li>
                        <li>Le Roi, La Reine, le Valet: 1</li>
                        <li>10, 9, ..., 2: 10, 9, ..., 2</li>
                    </ul>
                </p>`
    },
    {
        name: "8 Américain",
        path: "8-americain",
        component: HuitAmericainsComponent,
        image: "8americain.png",
        description: `Les joueurs jouent chacun leur tour dans le sens des aiguilles d'une montre (au début du jeu en tout cas aucune carte d'attaque ne peut être mise). 
                    Celui qui commence est à la gauche du donneur. 
                    À son tour, le joueur a le choix de jouer (c’est-à-dire de poser une carte sur le talon) 
                    soit une carte de la couleur de celle qui est en haut du talon, 
                    soit une carte de la même valeur, soit une carte joker à tout moment. 
                    Lorsqu'un joueur ne peut pas jouer de carte, il pioche une carte et passe son tour.`
    },
    {
        name: "Bataille",
        path: "bataille",
        component: BatailleComponent,
        image: "bataille.jpg",
        description: `<p>
                - On distribue les 52 cartes aux joueurs (la bataille se joue généralement à deux) qui les rassemblent face cachée en paquet devant eux.<br>
                - Chacun tire la carte du dessus de son paquet et la pose face visible sur la table.<br>
                - Celui qui a la carte la plus forte ramasse les autres cartes. <br>
                - L'as est la plus forte carte, puis roi, dame, valet, 10, etc. <br>
                - Lorsque deux joueurs posent en même temps deux cartes de même valeur il y a "bataille". 
                    Lorsqu'il y a "bataille" les joueurs tirent la carte suivante et la posent, face cachée, sur la carte précédente. 
                    Puis, ils tirent une deuxième carte qu'ils posent cette fois-ci face découverte et c'est cette dernière qui départagera les joueurs. 
                    Celui qui a la valeur la plus forte, l'emporte. <br>
                - Le gagnant est celui qui remporte toutes les cartes du paquet <br>
                <br><br>
                <strong> Valeur des cartes
                <ul>
                    <li>As: 14</li>
                    <li>Le Roi: 13</li>
                    <li>La Reine: 12</li>
                    <li>Le Valet: 11</li>
                    <li>10, 9, ..., 2: 10, 9, ..., 2</li>
                </ul>
            </p>`
    },
  ]