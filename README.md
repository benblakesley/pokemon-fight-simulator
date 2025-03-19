Play here: https://pokemon-fight-simulator.vercel.app

Every round 2 random pokemon are fetched using https://pokeapi.co
The user can then pick which pokemon they think will win the battle.
We then send a prompt to Google's Gemini asking which pokemon it thinks will win. The decision of the winner is completely up to Gemini.
Sometimes it gives stupid answers, thats part of the fun!

Tech:
    React
    Material UI for quick styling and transitions
    Framer Motion for animations
    Redux for state management
    Redux Persist for persistence
    NextJS routes for server side code.
