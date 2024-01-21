type Translations = { [key: string]: { [key: string]: string | string[] } }

const translations: Translations = {
  it: {
    'seo.title-home': 'RS Rechner - Quanti giorni ancora?',
    'seo.title-ranks': 'RS Rechner - Impara i gradi',
    'seo.description-home':
      'Quanti giorni mancano alla fine della RS? Cosa abbiamo già fatto? Qui trovi le risposte.',
    'seo.description-ranks':
      "Qui puoi imparare i gradi dell'esercito svizzero. Non dire mai al tuo tenente 'Sergente'!",
    'seo.keywords-home':
      'RS, scuola di reclute, esercito svizzero, svizzera, recluta, soldato, RS Rechner, calcolatrice, giorni, fine settimana, wochä',
    'seo.keywords-ranks':
      'RS, gradi, imparare, imparare i gradi, esercito svizzero, svizzera, recluta, soldato',
    'seo.image': '/social_preview.webp',
    'home.title': 'Per i ticinesi è la stessa cosa.',
    'home.start': 'Inizio',
    'home.end': 'Fine',
    'home.week': 'Settimana',
    'home.week-text': '/ {{weeks}} Settimane',
    'home.progress': 'Progresso',
    'home.progress-done': 'Fatto!!',
    'home.progress-messages': [
      'È ancora divertente!',
      'Comincia a essere divertente',
      'È già passata la metà',
      'Ci siamo quasi',
    ],
    'home.already-done': 'Già fatto',
    'home.already-done-text':
      'Qui sono contati tutti i giorni, compresi i fine settimana.',
    'home.until-start': "Fino all'inizio",
    'home.days': ' Giorni',
    'home.total': 'Totale',
    'home.total-message': 'Anche questo finisce un giorno',
    'home.soon-weekend': 'Presto il fine settimana',
    'home.soon-weekend-days-abbr': ['Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa', 'Do'],
    'home.soon-weekend-messages': [
      'È già lunedì...',
      'Almeno un giorno è passato!',
      "Mercoledì c'è l'uscita!",
      'Ancora due giorni!',
      'È già venerdì!',
      'Fine settimana!',
      'E tutto di nuovo...',
    ],
    'home.learn-by-heart': 'Imparare a memoria',
    'ranks.title': 'Gradi',
    'ranks.rekrut': 'Recluta (Recr)',
    'ranks.soldat': 'Soldato (Sdt)',
    'ranks.gefreiter': 'Appuntato (app)',
    'ranks.obergefreiter': 'Appuntato capo (app capo)',
    'ranks.korporal': 'Caporale (cpl)',
    'ranks.wachtmeister': 'Sergente (sgt)',
    'ranks.oberwachtmeister': 'Sergente capo (sgt capo)',
    'ranks.feldweibel': 'Sergente maggiore (sgtm)',
    'ranks.fourier': 'Furiere (fur)',
    'ranks.hauptfeldweibel': 'Sergente maggiore capo (sgtm capo)',
    'ranks.adjutant-unteroffizier': 'Aiutante sottufficiale (aiut sof)',
    'ranks.stabsadjutant': 'Aiutante di stato maggiore (aiut EM)',
    'ranks.hauptadjutant': 'Aiutante maggiore (aiut mag)',
    'ranks.chefadjutant': 'Aiutante capo (aiut capo)',
    'ranks.leutnant': 'Tenente (lt)',
    'ranks.oberleutnant': 'Primo tenente (plt)',
    'ranks.hauptmann': 'Capitano (cap)',
    'ranks.major': 'Maggiore (maj)',
    'ranks.oberstleutnant': 'Tenente colonnello (lt col)',
    'ranks.oberst': 'Colonnello (col)',
    'ranks.fachoffizier': 'Ufficiali specialisti',
    'ranks.brigadier': 'Brigadiere (Br)',
    'ranks.graddivisionaer': 'Divisionario (div)',
    'ranks.gradkorpskommandant': 'Comandante di corpo (cdt C)',
    'ranks.general': 'Generale',
    'noiframe.title': 'RS Rechner - Quanti giorni ancora?',
    'noiframe.realtitle': 'Vai sulla pagina giusta!',
    'noiframe.start': 'Inizio',
  },
  de: {
    'seo.title-home': 'RS Rechner - Wieviele Tage noch?',
    'seo.title-ranks': 'RS Rechner - Grade lernen',
    'seo.description-home':
      'Wie viele Tage noch bis zum Ende der RS? Was haben wir bereits geschafft? Hier findest du die Antworten.',
    'seo.description-ranks':
      "Hier kannst du die Grade der Schweizer Armee lernen. Sag nie deinem Leutnant 'Wachtmeister'!",
    'seo.keywords-home':
      'RS, Rekrutenschule, Schweizer Armee, Schweiz, Rekrut, Soldat, RS Rechner, Rechner, Tage, Wochenende, Wochä',
    'seo.keywords-ranks':
      'RS, Grade, lernen, Grade lernen, Schweizer Armee, Schweiz, Rekrut, Soldat',
    'seo.image': '/social_preview.webp',
    'home.title': 'Figged sie de Bode!',
    'home.start': 'Start',
    'home.end': 'End',
    'home.week': 'Wuchä',
    'home.week-text': '/ {{weeks}} Wuchä',
    'home.progress': 'Fortschritt',
    'home.progress-done': 'Fertig!!',
    'home.progress-messages': [
      'Es würd no luschtig!',
      'So langsam isch mä dinnä',
      'D hälfti isch scho verbii!',
      'Fascht gschafft!',
    ],
    'home.already-done': 'Scho verbii',
    'home.already-done-text':
      'Hie sind alli Täg mit iberächnet, au s Wucheend.',
    'home.until-start': 'Bis zum Afang',
    'home.days': ' Täg',
    'home.total': 'Total',
    'home.total-message': 'Isch au irgendwenn verbii...',
    'home.soon-weekend': 'Glii is Wuchänänd?',
    'home.soon-weekend-days-abbr': ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    'home.soon-weekend-messages': [
      'Es isch scho wieder Mäntig...',
      'Immerhin scho ei Tag verbii!',
      'Mittwuch gids Uusgang!',
      'Nur no zwei Täg!',
      'Wichtig isch... Dass Fritig isch!',
      'Wucheend!',
      'Und das ganze noch ein mal...',
    ],
    'home.learn-by-heart': 'Uswändig lerne',
    'ranks.title': 'Grade',
    'ranks.rekrut': 'Rekrut (Rekr)',
    'ranks.soldat': 'Soldat (Sdt)',
    'ranks.gefreiter': 'Gefreiter (Gfr)',
    'ranks.obergefreiter': 'Obergefreiter (Obgfr)',
    'ranks.korporal': 'Korporal (Kpl)',
    'ranks.wachtmeister': 'Wachtmeister (Wm)',
    'ranks.oberwachtmeister': 'Oberwachtmeister (Obwm)',
    'ranks.feldweibel': 'Feldweibel (Fw)',
    'ranks.fourier': 'Fourier (Four)',
    'ranks.hauptfeldweibel': 'Hauptfeldweibel (Hptfw)',
    'ranks.adjutant-unteroffizier': 'Adjutant-Unteroffizier (Adj Uof)',
    'ranks.stabsadjutant': 'Stabsadjutant (Stabsadj)',
    'ranks.hauptadjutant': 'Haupadjutant (Hptadj)',
    'ranks.chefadjutant': 'Chefadjutant (Chefadj)',
    'ranks.leutnant': 'Leutnant (Lt)',
    'ranks.oberleutnant': 'Oberleutnant (Oblt)',
    'ranks.hauptmann': 'Hauptmann (Hptm)',
    'ranks.major': 'Major (Maj)',
    'ranks.oberstleutnant': 'Oberstleutnant (Oberstlt)',
    'ranks.oberst': 'Oberst (Oberst)',
    'ranks.fachoffizier': 'Fachoffizier (Fachoff)',
    'ranks.brigadier': 'Brigadier (Br)',
    'ranks.graddivisionaer': 'Divisionär (Div)',
    'ranks.gradkorpskommandant': 'Korpskommandant (KKdt)',
    'ranks.general': 'General',
    'noiframe.title': 'RS Rechner - Wieviele Tage noch?',
    'noiframe.realtitle': 'Gang liäber uf diä richtig Sitä!',
    'noiframe.start': 'Start',
  },
  fr: {
    'seo.title-home': 'RS Rechner - Combien de jours encore?',
    'seo.title-ranks': 'RS Rechner - Apprendre les grades',
    'seo.description-home':
      "Combien de jours encore jusqu'à la fin de la RS? Qu'avons-nous déjà accompli? Ici tu trouveras les réponses.",
    'seo.description-ranks':
      "Ici tu peux apprendre les grades de l'armée suisse. Ne dis jamais à ton lieutenant 'sergent'!",
    'seo.keywords-home':
      'RS, école de recrues, armée suisse, suisse, recrue, soldat, RS Rechner, calculatrice, jours, week-end, semaines',
    'seo.keywords-ranks':
      'RS, grades, apprendre, apprendre les grades, armée suisse, suisse, recrue, soldat',
    'seo.image': '/social_preview.webp',
    'home.title': "Pour les romands, c'est la même chose.",
    'home.start': 'Début',
    'home.end': 'Fin',
    'home.week': 'Semaine',
    'home.week-text': '/ {{weeks}} Semaines',
    'home.progress': 'Progrès',
    'home.progress-done': 'Fini!!',
    'home.progress-messages': [
      "C'est encore amusant!",
      'Ça commence à être drôle',
      'La moitié est déjà passée',
      'On y est presque',
    ],
    'home.already-done': 'Déjà fait',
    'home.already-done-text':
      'Ici sont comptés tous les jours, y compris le week-end.',
    'home.until-start': "Jusqu'au début",
    'home.days': ' Jours',
    'home.total': 'Total',
    'home.total-message': 'Ça finit aussi un jour',
    'home.soon-weekend': 'Bientôt le week-end',
    'home.soon-weekend-days-abbr': ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
    'home.soon-weekend-messages': [
      "C'est déjà lundi...",
      'Au moins un jour est passé!',
      'Mercredi, il y a sortie!',
      'Plus que deux jours!',
      "C'est déjà vendredi!",
      'Week-end!',
      'Et tout encore une fois...',
    ],
    'home.learn-by-heart': 'Apprendre par coeur',
    'ranks.title': 'Rangs',
    'ranks.rekrut': 'Recrue (Recr)',
    'ranks.soldat': 'Soldat (Sdt)',
    'ranks.gefreiter': 'Appointé (app)',
    'ranks.obergefreiter': 'Appointé-chef (app chef)',
    'ranks.korporal': 'Caporal (cpl)',
    'ranks.wachtmeister': 'Sergent (sgt)',
    'ranks.oberwachtmeister': 'Sergent-chef (sgt chef)',
    'ranks.feldweibel': 'Sergent-major (sgtm)',
    'ranks.fourier': 'Fourrier (four)',
    'ranks.hauptfeldweibel': 'Sergent-major chef (sgtm chef)',
    'ranks.adjutant-unteroffizier': 'Adjudant sous-officier (adj sof)',
    'ranks.stabsadjutant': "Adjudant d'état-major (adj EM)",
    'ranks.hauptadjutant': 'Adjudant-major (adj maj)',
    'ranks.chefadjutant': 'Adjudant-chef (adj chef)',
    'ranks.leutnant': 'Lieutenant (lt)',
    'ranks.oberleutnant': 'Premier-lieutenant (plt)',
    'ranks.hauptmann': 'Capitaine (cap)',
    'ranks.major': 'Major (maj)',
    'ranks.oberstleutnant': 'Lieutenant-colonel (lt col)',
    'ranks.oberst': 'Colonel (col)',
    'ranks.fachoffizier': 'Officiers spécialistes',
    'ranks.brigadier': 'Brigadier (Br)',
    'ranks.graddivisionaer': 'Divisionnaire (div)',
    'ranks.gradkorpskommandant': 'Commandant de corps (cdt C)',
    'ranks.general': 'Général',
    'noiframe.title': 'RS Rechner - Combien de jours encore?',
    'noiframe.realtitle': 'Va sur la bonne page!',
    'noiframe.start': 'Début',
  },
}

export default translations
