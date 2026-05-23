# Transit Messages Guide

The flap board at `/flapboard` cycles through entries in `src/data/transitMessages.js`. Each entry simulates a real split-flap departure board — the kind you'd find in a train station or airport — and cycles through messages at random. The goal is to feel authentic enough that a real NYC subway rider does a double-take, while being funny enough that anyone else enjoys the bit.

This document covers the format, the character constraints, all the line colors, and a detailed breakdown of how to write great messages in each category.

> **Origin note — DC → NYC (May 2026):** The messages were originally modeled on DC Metro (WMATA). Station names, geographic humor, and cultural references all drew from the DC system. In May 2026 the entire pool was converted to NYC. The line color hex values are kept from the original DC palette (no new colors for the G, J, or Z lines — those trains share existing colors). The `line` field values — RED LINE, BLUE LINE, etc. — now map to NYC subway lines per the table below. All station references, transit jargon, and geographic jokes are NYC-specific. **If you're extending the message pool: don't use DC station names, WMATA terminology, or SmarTrip references.** Use MTA, MetroCard/OMNY, and the NYC station lists in this doc.

---

## Format

Each entry is a plain JavaScript object with four fields:

```js
{
  line:   "RED LINE",
  color:  "#BF0D3E",
  status: "15 MIN DELAY",
  detail: "Track obstruction between 72 St and 96 St."
}
```

These map directly to the three visible columns on the flap board display:

- **`line`** — The leftmost column. Which subway line (or ALL LINES).
- **`status`** — The middle column. What is happening. The headline.
- **`detail`** — The rightmost column. The elaboration. Where the personality lives.
- **`color`** — Not displayed directly, but drives the color accent on the line label.

---

## Character limits and allowed characters

The split-flap component can only render characters that exist in its physical character set. Anything outside these sets gets truncated or rendered blank, so it's important to stay within them.

| Field    | Max length | Allowed characters               |
|----------|------------|----------------------------------|
| `line`   | 12 chars   | A–Z, 0–9, space                  |
| `status` | 20 chars   | A–Z, 0–9, space, hyphen `-`      |
| `detail` | 72 chars   | A–Z, 0–9, space, `# $ % ' ( ) , - . : ?` |

**Characters to avoid entirely:**
- `&` — not in any set. Use "AND" instead.
- `!` — not in any set. The board does not do excitement.
- `@` — not in any set.
- `/` — not in any set. Use a dash or reword.
- `"` — not in any set. Use `'` for contractions only.
- Lowercase letters — the display is all-caps. You can write in lowercase in the source and it'll render fine as long as the component uppercases it, but writing in ALL CAPS in the source file keeps things readable and consistent with the real thing.

**Characters available in detail but not status:**
- `'` (apostrophe) — great for contractions like "We're", "Don't", "It's"
- `.` (period) — use to end sentences
- `,` (comma) — use for natural phrasing
- `:` (colon) — useful for "Cause: unknown. Status: unknown."
- `?` (question mark) — use sparingly for rhetorical effect
- `( )` (parentheses) — great for asides, e.g. "(We are not.)"
- `%` and `#` and `$` — available if you need them

**A note on length:** The display truncates at the limit — it doesn't wrap. 72 characters in the detail field is actually quite generous. Most great detail lines land between 45 and 65 characters. If you find yourself pushing 72, the line is probably trying too hard. Cut it.

---

## Line colors

Use these exact hex values. They match the NYC Subway line colors and are used to tint the line label on the display.

| Line        | Hex       | Notes                                      |
|-------------|-----------|--------------------------------------------|
| RED LINE    | `#BF0D3E` | 1/2/3 — Broadway-7th Ave                  |
| BLUE LINE   | `#0072CE` | A/C/E — 8th Ave / Nassau                  |
| GREEN LINE  | `#00B140` | 4/5/6 — Lexington Ave                     |
| ORANGE LINE | `#E3801C` | B/D/F/M — 6th Ave / Queens Blvd           |
| YELLOW LINE | `#FFD200` | N/Q/R/W — Broadway-BMT                    |
| PURPLE LINE | `#6950A1` | 7 — Flushing                              |
| SILVER LINE | `#A1A1A4` | L — 14 St-Canarsie                        |
| ALL LINES   | `#A1A1A4` | Use for system-wide notices                |

**When to use ALL LINES:** System-wide notices, jokes that don't fit a specific line, safety reminders, fourth-wall messages, and anything that feels like it comes from "management" rather than operations.

**When to pick a specific line:** When the joke or detail is tied to a real station or route, always use the correct line. It rewards NYC subway riders who recognize the geography. Putting a Wakefield Branch joke on the Red Line, or a Canarsie joke on the Silver Line, is a small detail that makes the whole thing feel more real.

---

## Real NYC subway station names

Using real station names makes realistic delays feel authentic and makes funny delays funnier. Here's a quick reference grouped by color line:

**Red Line (1/2/3):** Van Cortlandt Park-242 St, 238 St, 231 St, 215 St, 207 St, 191 St, 181 St, 168 St, 145 St, 137 St, 125 St, 116 St, 110 St, 103 St, 96 St, 86 St, 79 St, 72 St, 66 St-Lincoln Center, 59 St-Columbus Circle, 50 St, Times Sq-42 St, 34 St-Penn Station, 28 St, 23 St, 14 St, Christopher St, Houston St, Canal St, Chambers St, Fulton St, Wall St, Clark St, Borough Hall, Atlantic Ave-Barclays Ctr, Wakefield-241 St (2), New Lots Ave (3), Bay Ridge-95 St (R)

**Blue Line (A/C/E):** Inwood-207 St, 181 St, 175 St, 168 St, 145 St, 125 St, 96 St, 72 St, 59 St-Columbus Circle, 50 St, 42 St-Port Authority, 34 St-Penn Station, 23 St, 14 St, West 4 St, Spring St, Canal St, Fulton St, Jay St-MetroTech, Hoyt-Schermerhorn, Broadway Junction, Far Rockaway, Ozone Park-Lefferts Blvd

**Green Line (4/5/6):** Woodlawn (4), Pelham Bay Park (6), 238 St-Nereid Ave, 125 St, 116 St, 110 St, 103 St, 96 St, 86 St, 77 St, 68 St-Hunter College, 59 St, 51 St, Grand Central-42 St, 33 St, 28 St, 23 St, 14 St-Union Sq, Astor Pl, Bleecker St, Spring St, Fulton St, Wall St, Bowling Green, Borough Hall, Atlantic Ave-Barclays Ctr

**Orange Line (B/D/F/M):** 205 St (D), Bedford Park Blvd, 161 St-Yankee Stadium, 145 St, 125 St, 47-50 Sts-Rockefeller Ctr, 42 St-Bryant Park, 34 St-Herald Sq, 23 St, 14 St, W 4 St, Broadway-Lafayette St, Spring St, Canal St, Jay St-MetroTech, Atlantic Ave-Barclays Ctr, DeKalb Ave, Church Ave, Kings Hwy, Coney Island-Stillwell Ave, Jamaica-179 St (F)

**Yellow Line (N/Q/R/W):** Astoria-Ditmars Blvd, Astoria Blvd, Queensboro Plaza, 57 St-7 Av, Times Sq-42 St, 34 St-Herald Sq, 28 St, 23 St, 14 St-Union Sq, Canal St, City Hall, Whitehall St-South Ferry, DeKalb Ave, Atlantic Ave-Barclays Ctr, Bay Ridge-95 St, Jamaica-179 St, Coney Island-Stillwell Ave

**Purple Line (7):** Flushing-Main St, Mets-Willets Point, Junction Blvd, 74 St-Broadway/Jackson Hts-Roosevelt Av, 61 St-Woodside, Queensboro Plaza, Court Sq, Vernon Blvd-Jackson Av, Grand Central-42 St, 5 Av, Times Sq-42 St, 34 St-Hudson Yards

**Silver Line (L):** 8 Av, 6 Av, 14 St-Union Sq, 3 Av, 1 Av, Bedford Av, Lorimer St, Graham Av, Grand St, Montrose Av, Morgan Av, Jefferson St, DeKalb Av, Myrtle-Wyckoff Avs, Broadway Junction, Atlantic Av, Canarsie-Rockaway Pkwy

---

## Categories

---

### 1. Normal service

The most boring messages on the board, and intentionally so. These are palette cleansers. After three absurd delays in a row, a flat "NORMAL SERVICE / All Trains On Time" lands as a punchline on its own — because nobody believes it.

**The formula:** status = what it is, detail = a confirmation with zero personality.

**Examples:**
```
status: "NORMAL SERVICE"     detail: "All Trains On Time"
status: "NO DELAYS"          detail: "Normal Service"
status: "ON SCHEDULE"        detail: "Trains operating on published timetable."
status: "FULL SERVICE"       detail: "8-car trains in service. All stations open."
status: "ON TIME"            detail: "All trains running as scheduled."
status: "GOOD SERVICE"       detail: "No disruptions reported system-wide."
```

**Tips for writing normal service messages:**

- Keep the detail completely flat. No jokes, no winking. The restraint is the joke.
- Vary the phrasing across entries — "No Delays", "Normal Service", "All Trains On Time" all mean the same thing, and real boards cycle through all of them. Having several synonymous entries actually feels more realistic.
- You can add the tiniest hint of disbelief without breaking the deadpan: *"No delays. Still somehow running late."* — this reads as normal service but does something with it.
- Make sure every line has at least one normal service entry. The Silver Line going from sarcasm to sarcasm with no normal service mixed in feels cartoonish.
- Avoid ending normal service entries with periods — real boards don't punctuate status updates. Plain declarative phrases only.

---

### 2. Realistic delays

These are the messages that NYC subway riders recognize immediately. Specific station names, plausible causes, real-sounding jargon. The goal is for someone to read one and think "yep, sounds right" before moving on.

**The formula:** status = what the disruption is (with or without a time), detail = one sentence explaining where and why.

**Examples:**
```
status: "SINGLE TRACKING"    detail: "Between Woodlawn and 161 St for track inspection."
status: "PLATFORM HOLD"      detail: "Hold at 72 St for train spacing. Approx. 2 min."
status: "CROWDING"           detail: "Trains at capacity from Canarsie to Union Sq. Allow extra time."
status: "TRACK WORK"         detail: "Slow zone between 96 St and 110 St. Don't ask why."
status: "WEEKEND SVC"        detail: "Reduced frequency this weekend. Trains every 12 minutes."
status: "MINOR DELAY"        detail: "Earlier disabled train at Jamaica-179 St cleared. Expect 8 min gaps."
```

**Real MTA jargon to use:**
- *Single tracking* — trains sharing one track, usually for maintenance
- *Disabled train* — a broken-down train blocking the line
- *Slow zone* — section of track where trains run at reduced speed
- *Platform hold* — a train is holding at a station, not moving
- *Train spacing* — adjusting gaps between trains to even out service
- *Residual delays* — delays caused by an earlier incident that has since cleared
- *8-car train / 6-car train* — the number of cars matters to commuters
- *Non-revenue move* — a train moving without passengers (repositioning)
- *Crews on scene* — workers are physically there dealing with the problem
- *Has cleared* / *now cleared* — the thing that was blocking is gone

**Common realistic causes:**
- Signal problems (common on all lines; especially A/C/E corridor and outer sections of 1/2/3)
- Switch problems (junction points where lines diverge — Broadway Junction is a rich target)
- Disabled train at [station]
- Police activity at [station]
- Passenger assistance at [station]
- Door malfunction
- Power fluctuation
- Track inspection
- Rail inspection
- Track obstruction
- Crowding / platform congestion
- Flooding (a genuine NYC problem — heavy rain, burst pipes, hurricane remnants)
- Weather (heat in summer causes rail expansion; any snow causes chaos)
- Elevator / escalator outage

**Tips for writing realistic delays:**

- Station names are everything. "Track obstruction between 72 St and 96 St" is 10x more believable than "track obstruction near uptown." Use the real names.
- Spread realistic delays across lines — NYC delays hit the whole system. The 1/2/3 (Red) and A/C/E (Blue) are good targets since they cover a lot of ground and riders know their quirks.
- For timed delays, lean slightly odd: "8 minutes" feels more like a real estimate than "10 minutes." Round numbers feel made up.
- The detail should answer: *what happened, where, and what's the current status?* You rarely need more than one sentence to do this.
- Phrases like "Allow extra travel time" and "Plan for additional delays" are classic MTA and add instant authenticity.
- The Red Line's upper sections and the outer Queens/Brooklyn tails are both known for signal and switch issues. Good geography for realistic troubles.

---

### 3. Funny delays

Same structure as realistic delays, but the cause or resolution is absurd. The critical rule: **play it completely straight.** No winking, no exclamation points, no acknowledging the joke. The humor comes entirely from the contrast between the sober format and the ridiculous content.

**The formula:** status = a real-sounding label, detail = an absurd explanation delivered like a routine update.

**Examples:**
```
status: "WILDLIFE ON TRACK"   detail: "Squirrel at Pelham Bay Park. Negotiations ongoing."
status: "MEDICAL EMERGENCY"   detail: "Passenger insisted on finishing their podcast first."
status: "DOOR MALFUNCTION"    detail: "Doors opening on wrong side again. Classic."
status: "SMELL REPORTED"      detail: "At Grand Central station. We're on it. (We're not.)"
status: "GHOST CHIME"         detail: "Door chimed but refused to close. We have called a priest."
status: "OPERATOR NOTE"       detail: "Train operator said 'have a nice day.' First time in history."
```

**Techniques that work:**

**The parenthetical confession:**
The board says one thing officially, then the parenthetical reveals the truth.
```
detail: "Shuttle buses operating between stations. ETA: eventually."
detail: "We're on it. (We're not.)"
detail: "Not an emergency. Operator sneezed. We're fine."
```

**The bait-and-switch:**
Status implies something alarming; detail subverts it entirely.
```
status: "SERVICE SUSPENDED"   detail: "Just kidding. Service was already suspended."
status: "SECURITY ALERT"      detail: "There is no alert. We just wanted you to look up from your phone."
status: "SPEED INCREASE"      detail: "Briefly considered. Rejected."
status: "PRICE DROP"          detail: "Ha."
```

**The overcorrection:**
A tiny problem receives disproportionate gravity.
```
status: "1 MIN DELAY"         detail: "We are deeply sorry. This is unacceptable. We are in shock."
status: "LEAF ON TRACK"       detail: "One leaf. Very small. Very threatening. Crews dispatched."
```

**The passive-aggressive narrator:**
The transit authority is aware of the problem, mildly annoyed, and not fully invested in fixing it.
```
detail: "Smooth sailing. Don't jinx it."
detail: "Tap your card. Tap again. Harder. Try the other gate."
detail: "Please move to the end of the platform where no one ever stands."
detail: "We have received your complaint. We have filed it appropriately."
```

**The escalation:**
A situation that started minor has gotten worse through inaction.
```
detail: "Earlier delays have caused further delays. Updates to follow."
detail: "A delay caused a delay which is causing this delay. Full circle."
detail: "Train stuck behind a train stuck behind a train. Looking into it."
```

**Tips for writing funny delays:**

- The shorter the detail, the harder it usually lands. *"Ha."* is funnier than a paragraph.
- Use "we" consistently. The narrator is always the transit authority — a faceless institution that is vaguely aware of problems and not particularly motivated to fix them.
- Avoid adjectives that editorialize. Don't say "hilariously" or "unfortunately." Let the situation speak.
- The best funny statuses still look plausible at a glance: WILDLIFE ON TRACK, DOOR MALFUNCTION, SMELL REPORTED. The absurdity is in the detail, not the status.
- Specificity is always funnier than vagueness. "The squirrel at Pelham Bay Park" beats "an animal on the tracks." Naming things commits to the bit.
- Never use `!`. The board doesn't do enthusiasm. Even catastrophic failures are communicated flatly.
- Real MTA events that actually happened (and are public knowledge) are fair game: the L train shutdown scare, the weekend reroutes that confused everyone, the flooding at Hoyt-Schermerhorn. The closer to a real incident the funnier it reads to subway riders.

---

### 4. Timed delays

Time in the status field is its own category because it adds a layer of specificity that makes both realistic and funny entries land differently. A plain "DELAY" is vague. "8 MIN DELAY" feels like someone actually measured it.

**Realistic timed delays** use believable minute counts and plausible causes:
```
status: "8 MIN DELAY"     detail: "Earlier disabled train at Fulton St has cleared."
status: "15 MIN DELAY"    detail: "Track obstruction between 72 St and 96 St."
status: "20 MIN DELAY"    detail: "Rail inspection between Bedford Ave and Lorimer St."
status: "6 MIN DELAY"     detail: "Door malfunction at Borough Hall. Train now moving."
status: "4 MIN DELAY"     detail: "Passenger assistance at Times Sq-42 St. Brief platform hold."
```

**Funny timed delays** use the time itself as part of the joke:
```
status: "0 MIN DELAY"     detail: "On time. We're as surprised as you are. Screenshot this."
status: "1 MIN DELAY"     detail: "We are deeply sorry. This is unacceptable. We are in shock."
status: "67 MIN DELAY"    detail: "Not 60. Not 70. Sixty-seven. We don't make the rules."
status: "99 MIN DELAY"    detail: "Estimated. Possibly more. Possibly less. Probably more."
status: "47 MIN DELAY"    detail: "Cause: unknown. Status: unknown. Vibes: not great."
status: "11 MIN DELAY"    detail: "Eleven minutes. Not 10, not 12. Eleven. Precise for once."
```

**Tips for writing timed delays:**

- For realistic: slightly odd numbers (8, 13, 18) feel like real estimates. Round numbers (10, 20, 30) feel like guesses — which is accurate, but less convincing.
- For funny: oddly specific numbers (67, 47, 11) are inherently funny because they imply someone measured something that clearly was not measured.
- 0 minutes and 1 minute work because the detail has to react to the absurdity of how small the delay is being treated with such gravity.
- Very large numbers (99, 999) work because they are technically a delay estimate and technically not wrong.
- The combination of a real-sounding time with an absurd cause is a reliable formula: *"8 MIN DELAY / Someone held the doors. They know what they did."*

---

### 5. Dry/bureaucratic humor

A sub-style of funny that leans entirely on institutional language — the kind of corporate non-answer that sounds official but says absolutely nothing. These work because they mimic real PR communication from transit authorities, which is already surreal.

**Examples:**
```
status: "IMPROVEMENT PLAN"   detail: "We have a plan. The plan has been updated. The update has a plan."
status: "INVESTIGATION"      detail: "We are looking into it. We have been looking into it since 2011."
status: "COMPLAINT REVIEWED" detail: "Your feedback has been received and closed as 'working as intended.'"
status: "CUSTOMER FEEDBACK"  detail: "We've received your complaint. We've filed it appropriately."
status: "AWARD WINNER"       detail: "MTA voted #1 transit system in the New York area. Uncontested."
status: "ON-TIME UPDATE"     detail: "We've updated our definition of 'on time.' You're welcome."
```

**Tips:**
- These work best with "ALL LINES" — in NYC the dysfunction is system-wide, not one line's reputation.
- The key is that the statement is technically true or technically an action was taken, but it does nothing.
- Circular logic ("the update has a plan", "delays caused by earlier delays") lands especially well.
- Official-sounding award and recognition messages are a rich vein: an institution congratulating itself on something that isn't actually good.

---

### 6. Fourth-wall / meta

These break the fiction entirely and address the reader directly. They acknowledge that this is a portfolio website, that there's a real person reading a fake train board, and that perhaps they should go look at the actual projects.

Use these very sparingly. They only work because they're unexpected. If every third message is fourth-wall, the bit collapses. A handful in a pool of 100+ realistic messages is about right.

**Examples:**
```
status: "ATTENTION"       detail: "You are reading a fake transit board on a portfolio website."
status: "STILL READING"   detail: "You're still here. The recruiter has moved on. Just saying."
status: "PAY ATTENTION"   detail: "This is a website. Not a train station. Please look around."
status: "EYES UP"         detail: "There are real projects above this. Have you seen them yet?"
status: "USER DETECTED"   detail: "Hello. We see you. Reading fake train alerts. No judgment."
status: "STATUS UPDATE"   detail: "You: reading flap board. Rohit: hoping you check out his work."
status: "FINAL NOTICE"    detail: "This is the last message. Scroll back up. Go hire someone."
```

**Tips for writing fourth-wall messages:**

- The best ones balance gentle ribbing with a real redirect. "Go hire someone" is funny and also says something useful.
- Don't be mean-spirited — the reader is doing something fun by spending time here. Acknowledge that.
- "Rohit" by name is more personal than "the developer" or "the site owner." Personal beats institutional for these.
- Use "we" when the transit authority is still narrating, use "you" when the message is addressed to the reader. The shift is part of what makes these land.
- One of these showing up after 20 realistic delays is the payoff. The more authentic the surrounding entries, the harder the fourth-wall break hits.
- Never cluster them together. Spread them out across the pool.

---

---

## Coming up with new ideas

This is the section the rest of the document doesn't tell you. Everything above describes how to execute within the categories that already exist. This section is about how to find things that don't exist yet — new angles, new voices, new categories entirely. The existing messages are good but they're not the ceiling. The ceiling is wherever you stop looking.

---

### Start with the real thing

The single best source of new ideas is real transit communication. NYC MTA, London Underground, Tokyo Metro, BART — these systems put out alerts, announcements, and notices constantly, and the gap between what they say and what they mean is where most of the comedy lives.

**Ways to mine real transit for ideas:**

- **Read actual MTA alerts.** Follow [@NYCTSubway on Twitter/X](https://twitter.com/NYCTSubway) or check the MTA service alerts page. Real alerts are often unintentionally funny: vague causes, circular explanations, things that happened weeks ago still listed as "residual." Take real language and either heighten it or undercut it.
- **Ride the subway.** The overhead PA announcements are a goldmine. Operators have wildly different styles — some are robotic, some are genuinely warm, some sound like they've given up. All of them are material.
- **Look at other transit systems.** The London Underground has a famous tradition of witty platform signage. Tokyo Metro is obsessively specific and polite. NYC MTA is blunt to the point of hostility. Each system has its own personality. What would a message sound like if the MTA suddenly adopted Tokyo's relentless courtesy? Or London's wit?
- **Read historical transit incidents.** The 2019 L train shutdown that got cancelled four weeks before it was supposed to start. The recurring flooding at multiple stations. The years of weekend reroutes that never made sense. These are public knowledge and the way the MTA communicated about them (or didn't) is fascinating and sometimes absurd. You don't need to reference specific tragedies — but the patterns of how transit authorities talk around problems is useful material.

---

### Ask "what if" questions

Most of the categories in this document came from asking a simple "what if" and following it. Try these as jumping-off points:

- **What if the train were sentient?** What would it want? What would it complain about? What would it refuse to do?
- **What if the transit authority were honest for one message?** Not ironic-honest — actually honest. "We don't know why this is happening." "We have not fixed this and probably won't." "The real delay is 40 minutes but we said 8 so you wouldn't leave."
- **What if it were directed at a specific type of commuter?** The person who holds the door every single time. The person eating a full meal on the train. The person who stands on the left side of the escalator. The tourist who doesn't know to let people off first.
- **What if it acknowledged something everyone knows but nobody says?** That the Red Line is always broken. That the escalators are always out. That the app is useless. That the paper maps are from 2007.
- **What if time worked differently?** What if delays were measured in other units — stops, stations, emotional exhaustion, number of podcasts you could finish?
- **What if the board got philosophical?** About waiting. About movement. About the strange intimacy of being underground with strangers.
- **What if a specific passenger got called out?** Not cruelly — but the person who clipped their nails on the train. The person with the speaker. The person who somehow has a full suitcase at rush hour.
- **What if it were for a different audience entirely?** The squirrel. The train operator. The ghost of whoever designed the fare gates.
- **What if the SHOWTIME performers got a service update?** "SHOWTIME IN PROGRESS / Car 4. ETA: 3 more stops. Please grip pole."
- **What if the L train shutdown had actually happened?** A full year of suspended service that got cancelled four weeks before it was supposed to start. The board that never got to display it.
- **What if the rats were unionized?** Platform fauna with collective bargaining rights. Demands: better lighting, fewer humans at 2am.
- **What if the 24-hour service were acknowledged as a choice?** "The subway never closes. This is why maintenance is difficult. We have accepted this."

---

### Steal from other formats

The flap board format — line, status, detail — is rigid, but the *voice* inside it can borrow from anywhere. Some underexplored sources:

**Error messages.** "404: Train Not Found." "Connection timed out. Retry? (Y/N)" "An unexpected error occurred. Error code: Monday." Software error messages and transit failure speak the same bureaucratic language. They're almost interchangeable.

**Warning labels.** The flat, liability-driven language of product warnings maps perfectly onto transit notices. "Do not board if train is on fire. Board only if delay exceeds personal threshold."

**Terms and conditions.** Nobody reads them. Everyone is bound by them. "By boarding this train you agree to our current service levels, which we define as whatever is currently happening."

**Horoscopes.** Vague, personal, probably meaningless but weirdly specific. "ORANGE LINE / WEEKLY OUTLOOK / Expect turbulence near Atlantic Ave. The universe does not offer refunds."

**Out-of-office messages.** "Train is currently out of service. For urgent travel needs, please try the bus. The bus is also out of service."

**Weather forecasts.** "YELLOW LINE / 7-DAY FORECAST / Delays Monday through Sunday. Localized chaos near Times Sq. Low chance of on-time arrival."

**Motivational posters.** The gap between inspirational language and transit reality is rich. "YOU'VE GOT THIS / The train is coming. Eventually. Believe."

**Mission statements.** Corporate vision applied to a broken system. "ALL LINES / OUR MISSION / To connect communities. We are working on the connecting part."

**Nutrition labels.** Per serving: 45 minutes of waiting, 12% of your daily patience, 0% on-time arrivals. Serving size: one commute.

---

### Think in opposites

Take any real message and invert it. If you have a delay message, write the version where the thing that went wrong somehow went right. If you have a routine announcement, imagine what happens when it breaks down completely.

| Real version | Inverted version |
|---|---|
| Train arriving in 3 minutes | Train arrived 3 minutes ago. We forgot to tell you. |
| Doors closing. Please stand clear. | Doors open. Have been open. We've stopped asking. |
| This train is for Far Rockaway. | This train is for somewhere. Conductor will decide en route. |
| Thank you for riding the subway. | You didn't have a choice. But thank you. |
| Please report suspicious activity. | We reported suspicious activity. Nothing happened. |
| Exit here for the High Line. | Exit here for the High Line. Walk for 15 minutes. Worth it. |

The inversion doesn't always produce something usable — but it almost always produces something interesting, and interesting is the starting point.

---

### Mine the commuter experience directly

The funniest messages in the pool are funny because they're true. Someone has experienced every single one. A useful exercise is to think through the full arc of an NYC subway commute and ask what actually happens at each step:

1. **Checking the app** — the times are wrong. The app shows a train that has already left. The app shows a train that does not exist.
2. **Buying/loading a MetroCard or tapping OMNY** — gate rejects it. Balance is $0.05 short. The MetroCard machine is out of service. The OMNY reader is blinking red. You tap three more times. Nothing.
3. **The escalator** — broken. Has been broken. Is now a staircase. Is now a down escalator going up. Is now an art installation.
4. **Waiting on the platform** — train is 2 minutes away, then 4 minutes away, then 2 minutes away again. The countdown board resets to dashes. Another train arrives going the wrong direction. A rat crosses the far track unbothered.
5. **Boarding** — someone holds the door. The door beeps. The door beeps again. The door closes on someone's bag. The door opens. The door beeps. SHOWTIME has been announced in the next car.
6. **Riding** — announcements are inaudible. Or too loud. The operator's name sounds different every time they say it. The car sways more than seems reasonable. The AC is either off or set to arctic. You cross the Manhattan Bridge and it's beautiful and you'll never admit you always look.
7. **Transfers** — the escalator at the transfer station is also broken. The platform is on the opposite end from where you boarded. The connecting train just left.
8. **Arriving** — exit gate rejects your card again. The elevator is out. You emerge on the wrong street. The street you wanted is one block away and somehow also on the wrong side.

Every one of these steps is a category waiting to happen.

---

### Untapped categories worth exploring

The existing pool has good coverage of delays, service notices, and fourth-wall breaks. Here are categories that are underrepresented or don't exist yet:

**Seasonal messages.** The MTA's behavior changes with the seasons in very predictable ways. Snow causes complete system chaos regardless of accumulation. Summer heat causes rail expansion and slow zones. Fall brings leaves on the tracks. Spring brings... optimism that is quickly defeated.

```
status: "FALL ADVISORY"      detail: "Leaf season has begun. All trains are now slower. By tradition."
status: "SUMMER SLOW ZONE"   detail: "Rail expansion detected. Trains slowed. It is June. This happens every June."
status: "SNOW PLAN"          detail: "Modified service begins at 0.3 inches. We have a plan for 0.3 inches."
```

**Passenger archetypes.** Specific enough to be recognizable, vague enough not to single anyone out.

```
status: "DOOR HOLDER"        detail: "Someone is holding the door. The train cannot leave. They know."
status: "POLE LEANER"        detail: "The center pole is currently in use as a backrest. Please adapt."
status: "LOUD CALLER"        detail: "Personal call audible from car 3. Situation developing. Updates to follow."
```

**Staff messages.** The operator. The station manager. The person whose job is to stand near the gate. These are people with very specific jobs in a system that doesn't always work, and their perspective is completely unexplored.

```
status: "OPERATOR NOTE"      detail: "Operator requests passengers move to the center of the car. Again."
status: "STAFF ADVISORY"     detail: "Station manager unavailable. Station manager was never available."
```

**Infrastructure complaints.** The escalators, the fare gates, the MetroCard/OMNY readers, the overhead displays. These are all characters in their own right and they all fail in specific, predictable ways.

```
status: "ESCALATOR SVC"      detail: "Escalator operating as a staircase. Thank you for your patience."
status: "FARE GATE ERROR"    detail: "Gate rejected valid card. Please try again. And again. And again."
status: "DISPLAY OUTAGE"     detail: "This display is working. The display showing your train is not."
```

**Philosophical / existential.** The subway exists in a strange space — underground, between places, full of people going somewhere else. There's something genuinely strange about it that hasn't been touched yet.

```
status: "REFLECTION TIME"    detail: "You are 40 feet underground going 35 mph. Take a moment."
status: "BRIEF PAUSE"        detail: "The train is stopped. You are stopped. Everything is stopped. Hi."
status: "BETWEEN STATIONS"   detail: "You are currently nowhere. This is fine. Next stop: somewhere."
```

**Customer service theater.** The formal acknowledgment of a problem that does nothing to solve it. Related to bureaucratic humor but more specifically about the customer service script.

```
status: "APOLOGY ISSUED"     detail: "We regret this delay. We do not regret it very much."
status: "FEEDBACK NOTED"     detail: "We value your feedback. We have noted it. We will not act on it."
status: "CASE OPENED"        detail: "Your complaint has been assigned a case number. The number is 7."
```

**Cross-line commentary.** Lines commenting on other lines. The 1/2/3's delay reputation is known citywide. The A train has a reputation for being very, very long. The L nearly got shut down for a year and has never fully let anyone forget it. What does the Green Line (4/5/6) think about sharing a platform at Grand Central with the Purple Line (7)? What does the Silver Line (L) think about being the line Williamsburg hipsters depend on?

```
status: "RED LINE UPDATE"    detail: "Still delayed. Green Line asks that you please stop asking." (on GREEN LINE)
status: "SILVER LINE NOTE"   detail: "We go to Canarsie. We have always gone to Canarsie. Please tell people." (on SILVER LINE)
status: "A TRAIN NOTE"       detail: "A train to Far Rockaway: 42 stops. Plan accordingly." (on BLUE LINE)
```

**Time-of-day messages.** The commute feels different at 7am versus 11pm. The board could reflect that.

```
status: "LATE NIGHT SVC"     detail: "Trains every 20 minutes. You should have left earlier. We all should have."
status: "EARLY SVC"          detail: "5:14am service now running. You have our respect and our concern."
status: "RUSH HOUR"          detail: "Trains crowded. This is expected. This happens every day. Every day."
```

---

### The idea generation loop

When you sit down to write new messages, try this sequence:

1. **Pick a real thing that's annoying about transit.** Not a fictional thing — something that actually happens. Delays, broken escalators, bad apps, confusing maps, fare gate failures, crowding, the smell, the heat.

2. **Write the version MTA would actually say.** Formal, vague, minimally helpful. "Service disruption reported. Crews investigating. Allow extra travel time."

3. **Write the honest version.** What is actually happening, with no institutional filter. "The escalator has been broken for four months. We have no plan to fix it."

4. **Write the version where we're aware of the reader.** How does this connect to someone sitting at a portfolio website? What does it say to them indirectly?

5. **Cut it down to fit the format.** Status (20 chars), detail (72 chars). Cutting almost always makes it funnier.

6. **Ask: does this need to exist?** If it's too similar to something already in the pool, either make it distinct enough to earn its place or don't add it. A pool of 150 distinct messages is better than a pool of 200 where 50 are near-duplicates.

---

### Signs that a message is working

- You read it in the flat robotic voice and it's still funny.
- It says something true about transit, or people, or bureaucracy — even if it's silly.
- It earns its place in the pool: it couldn't be cut without the pool being slightly worse.
- It doesn't need the surrounding messages to make sense — each one stands alone on the board.
- Someone who has never ridden the NYC subway still gets it, even if the joke lands differently for someone who has.

### Signs a message isn't working

- It requires context to land. The board gives none.
- You had to explain the joke to yourself while writing it.
- It's a variation of something already in the pool without being distinct enough.
- It uses a word or character that doesn't render on the display.
- The status oversells the joke so the detail has nothing left to do — or vice versa, the detail does all the work and the status is dead weight.
- It sounds like a joke about transit rather than a transit message that happens to be funny. The format has to stay intact.

---

## General writing rules

These apply to all categories:

1. **No exclamation marks.** Transit boards don't have feelings. The absence of excitement is part of the voice.

2. **ALL CAPS throughout.** Write in uppercase to match the display. It also forces you to think about word count since long phrases look longer in caps.

3. **Periods in detail are optional but good.** They add a bureaucratic finality. *"We're on it."* hits differently than *"We're on it"*.

4. **The narrator is always "we."** An indifferent transit authority. Not malicious, not apologetic, just... there. Vaguely aware that things are suboptimal.

5. **Specificity beats vagueness every time.** "A squirrel" → "The squirrel at Pelham Bay Park." "A long time" → "Sixty-seven minutes." "Some issues" → "Signal failure between 72 St and 96 St." The detail is in the specificity.

6. **Don't over-explain the joke.** If you find yourself writing a second sentence to make sure the reader gets it, cut the second sentence. Trust the setup.

7. **Read it out loud in a flat robotic voice.** If it's still funny delivered completely deadpan, it works. If it needs inflection to land, rewrite it.

8. **Balance the pool.** The board cycles randomly. Too many funny entries in a row and the bit gets exhausting. Too many normal service entries and it's boring. A rough target: 15% normal service, 30% realistic delays, 30% funny, 15% timed delays, 10% fourth-wall/meta. Adjust to taste.

9. **Keep the detail under 65 characters if you can.** The limit is 72, but shorter is almost always sharper. If you can't say it in 65 characters, ask whether the extra words are earning their space.

10. **Avoid `&`, `!`, `@`, `/`.** They're not in the allowed character set. Use "AND" instead of `&`. Rephrase anything that needs `!` — the flat delivery is better anyway.
