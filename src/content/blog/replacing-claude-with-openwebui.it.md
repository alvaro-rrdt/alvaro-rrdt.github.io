---
title: "Sostituire Claude con openwebui, deepseek e searxng"
description: "Come ho spostato il mio flusso di lavoro AI quotidiano da un abbonamento Claude a openwebui self-hosted con deepseek, searxng e playwright: ricerca web e visione da qualsiasi dispositivo via tailnet, a metà del costo."
pubDate: 2026-08-30
category: platform
locale: it
tags: [openwebui, deepseek, searxng, playwright, self-hosted, ai]
---

L'obiettivo era semplice: volevo che il mio setup AI si comportasse come
il resto del mio homelab. Self-hosted, raggiungibile da qualsiasi
dispositivo via tailnet, privato per impostazione predefinita e senza
una quota mensile fissa.

Ero un utente Claude a pagamento, e il prodotto è buono. Ma venti euro
al mese che li usassi o no, più una finestra di utilizzo di cinque ore,
iniziavano a sembrare l'affitto di qualcosa che potevo possedere.

## Il modello: la visione era la parte difficile

Codice e testo potevo già averli a poco. La visione era il requisito che
mi teneva su Claude: screenshot, diagrammi di architettura, dump di
errori.

Poi ho trovato deepseek v4 flash vision. DeepSeek dichiara prestazioni
di visione alla pari con claude opus 4.8, e nel mio uso quotidiano
(screenshot di interfacce, foto di lavagne, log incollati) ha
corrisposto a quello che ho visto. È stato il momento in cui
l'abbonamento ha smesso di essere necessario.

## Il confronto sulla ricerca web

Con il modello sistemato sono diventato ingordo: la ricerca web di
claude è genuinamente utile, e la volevo anch'io. Forse anche migliore,
visto che il pipeline lo avrei controllato io.

La ricerca web in openwebui si divide in due decisioni: chi cerca e chi
legge le pagine. Sul lato ricerca ho confrontato le opzioni hostate
(linkup, tavily) con il self-hosting di searxng. Sul lato loader:
playwright, firecrawl e i progetti più recenti come crawl4ai.

Sono ottimi prodotti, e diversi includono persino una quota mensile
gratuita. Il problema è cosa significhi "gratis" quando il tuo agente
cerca in sciami: una sola domanda di ricerca si ramifica in una dozzina
di query, e ognuna si ramifica in pagine da leggere. Le quote sono
pensate per una persona che cerca, non per un modello che cerca in
sciami. Appena l'uso sale, il tier gratuito sparisce e si torna al
pagamento a consumo.

Così il filtro si è scritto da solo: open source, gratis, in esecuzione
sul mio hardware e personalizzabile in modi che una API hostata non sarà
mai.

- searxng come motore di metaricerca: nessuna API key, nessuna quota,
  nessun costo per chiamata. Scelgo io quali motori interroga, come sono
  ponderati, lingua e regione, e restituisce un JSON pulito che il
  modello può digerire.
- playwright come loader: rendering JavaScript completo, che è ciò di
  cui la maggior parte delle pagine moderne ha bisogno prima che un
  modello possa leggerle, con controllo su attese, scroll ed estrazione.

Insieme fanno molto bene il lavoro, e la personalizzazione è proprio la
parte che una API hostata non può replicare: decido io come si cerca il
web e come viene letto.

### Due test reali

Il primo: controllare il prezzo di crowdstrike nell'ultima settimana e
cosa ha mosso i cambiamenti. Il pipeline ha cercato, playwright ha
caricato le pagine di mercato che renderizzano davvero i numeri, e il
modello ha esposto il movimento insieme alle notizie che lo hanno
guidato. Quel tipo di ricerca multi-step che prima significava aprire
venti tab.

![Tool call di openwebui per la ricerca su crowdstrike: searxng cerca e playwright carica le pagine](../../assets/blog/crowdstrike-1-tool-calls.png)

*Le tool call: searxng cerca, playwright legge le pagine.*

![La risposta dell'IA sul prezzo di crowdstrike: driver, casi bull e bear, e le 34 fonti consultate](../../assets/blog/crowdstrike-2-ai-reply.png)

*La risposta: cosa ha mosso il prezzo, il verdetto bull vs bear e le 34 fonti dietro.*

Il secondo è in corso: sto candidandomi a startup e scaleup, e prima di
entusiasmarmi per un'azienda voglio i suoi numeri finanziari e chi
sostiene chi. Investitori, round, runway. Lo stesso pipeline scava tra
le pagine di finanziamento e i siti aziendali per distinguere un posto
sano con un bel futuro da uno che sta bruciando.

Sto ancora regolando: i pesi dei motori in searxng, i timeout di
playwright e quanto aggressivo deve essere il passaggio da pagina a
testo.

## La parte dei soldi

Sarò onesto sul detonatore: al momento sono un po' senza soldi, e un
abbonamento AI mensile fisso è un cattivo affare quando l'uso è a
picchi.

La piattaforma deepseek è pay as you go: carico crediti e li spendo
quando voglio. Rispetto ai venti euro fissi, mi costa la metà o meno
anche con un uso intenso, e non c'è finestra di cinque ore. Piccola
differenza sulla carta, grande differenza per un neolaureato tra
colloqui.

## Il prossimo esperimento: openobserve

Il monitoring è il prossimo pezzo che voglio smuovere. Il cluster gira
con prometheus e grafana oggi e funzionano, ma continuo a imbattermi in
openobserve: un singolo binario che copre metriche, log e tracing, cioè
più o meno ciò che prometheus e grafana fanno insieme e qualcosa in
più. Include persino il monitoring per l'AI in profondità, e le aziende
lo stanno adottando largamente, il che ti dice dove sta andando
l'osservabilità.

Per me il gancio è il costo, di nuovo: i crediti a consumo significano
che ogni ricerca web costa qualcosa, e l'unico modo per tenere una
fattura personale minuscola è sorvegliarla bene. Tracciare token, query
e spesa per pipeline nello stesso strumento che veglia sui miei servizi
mi sembra esattamente giusto. Può darsi che lo scambio finisca in un
post futuro, collegandolo a questo setup.

## Perché ha importanza oltre me

openwebui self-hosted, un modello con visione a crediti e una ricerca
web propria sostituiscono il mio flusso di lavoro claude: lo stesso
accesso da qualsiasi dispositivo via tailnet, dati che non escono mai
dalla mia rete e un costo che segue l'uso invece del calendario.

Ho visto da vicino il lato dei costi fissi: in una precedente
esperienza lavorativa, ogni dipendente aveva un posto Claude a venti
euro al mese fissi. Moltiplicalo per posto e la fattura diventa seria,
e sono convinto che una versione di questo setup implementata bene
ridurrebbe quel costo in modo considerevole.

A livello aziendale questo schema funziona, se fatto bene: openwebui
dietro authentik per SSO, modelli a crediti o self-hosted, e la ricerca
su un'istanza searxng interna. Il risparmio si moltiplica per ogni
dipendente, e i dati restano dentro il perimetro. È un progetto di
platform engineering che ne vale la pena, non un ripiego.

I tradeoff onesti: cose come la collaborazione in stile cowork e quanto
sia intuitivo Claude Desktop mettono l'asticella alta per qualsiasi
sostituto. Ma la direzione è chiara. I governi si stanno già spostando
su deployment self-hosted in stile openwebui, e l'UE continua a
rafforzare l'ecosistema open source. È solo questione di tempo prima
che i posti AI a canone fisso diventino insostenibili e le alternative
open decollino.
