export const LINES = [
  // Normal service — sprinkled in for variety
  { line: "RED LINE",    color: "#BF0D3E", status: "NO DELAYS",         detail: "Normal Service" },
  { line: "BLUE LINE",  color: "#0072CE", status: "NORMAL SERVICE",     detail: "All Trains On Time" },
  { line: "GREEN LINE", color: "#00B140", status: "NORMAL SERVICE",     detail: "All Trains On Time" },
  { line: "ORANGE LINE",color: "#E3801C", status: "NO DELAYS",          detail: "Normal Service" },
  { line: "YELLOW LINE",color: "#FFD200", status: "NORMAL SERVICE",     detail: "All Trains On Time" },
  { line: "PURPLE LINE",color: "#6950A1", status: "NO DELAYS",          detail: "Normal Service" },
  // Realistic delays
  { line: "RED LINE",   color: "#BF0D3E", status: "SINGLE TRACKING",    detail: "Train ahead moving at human walking speed" },
  { line: "BLUE LINE",  color: "#0072CE", status: "NORMAL SERVICE",     detail: "No delays. Still somehow running late." },
  { line: "GREEN LINE", color: "#00B140", status: "2 MIN DELAY",        detail: "Passenger door being dramatic at Pelham Bay Park" },
  { line: "YELLOW LINE",color: "#FFD200", status: "MINOR DELAYS",       detail: "Someone brought a full-size bicycle aboard" },
  { line: "ORANGE LINE",color: "#E3801C", status: "NORMAL SERVICE",     detail: "Doors closing. Please stand clear of the doors." },
  { line: "PURPLE LINE",color: "#6950A1", status: "NO DELAYS",          detail: "Smooth sailing. Don't jinx it." },
  // Funny / chaotic
  { line: "YELLOW LINE",color: "#FFD200", status: "EXPRESS SERVICE",    detail: "Scroll down to reach your destination 40% faster" },
  { line: "ORANGE LINE",color: "#E3801C", status: "FARE INCREASE",      detail: "Not really. We just wanted your attention." },
  { line: "RED LINE",   color: "#BF0D3E", status: "TRACK WORK",         detail: "This weekend, every weekend, all weekends, forever" },
  { line: "ALL LINES",  color: "#A1A1A4", status: "SYSTEM NOTICE",      detail: "Thank you for riding the RS Transit Authority" },
  { line: "BLUE LINE",  color: "#0072CE", status: "OFFLOAD REQUIRED",   detail: "Everyone off. Train is tired. Please take next one." },
  { line: "GREEN LINE", color: "#00B140", status: "WILDLIFE ON TRACK",  detail: "Squirrel at Pelham Bay Park. Negotiations ongoing." },
  { line: "RED LINE",   color: "#BF0D3E", status: "MEDICAL EMERGENCY",  detail: "Passenger insisted on finishing their podcast first" },
  { line: "ORANGE LINE",color: "#E3801C", status: "DOOR MALFUNCTION",   detail: "Doors opening on wrong side again. Classic." },
  { line: "RED LINE",   color: "#BF0D3E", status: "SIGNAL PROBLEM",     detail: "Between every station, as per MTA tradition" },
  { line: "BLUE LINE",  color: "#0072CE", status: "BREAKING NEWS",      detail: "Train arrived exactly on time. Engineers baffled." },
  { line: "GREEN LINE", color: "#00B140", status: "SMELL REPORTED",     detail: "At Grand Central station. We're on it. (We're not.)" },
  { line: "PURPLE LINE",color: "#6950A1", status: "WILDLIFE ON TRACK",  detail: "Squirrel at Flushing-Main St. Negotiations ongoing." },
  // More funny / chaotic
  { line: "SILVER LINE", color: "#A1A1A4", status: "SCHEDULE CHANGE",    detail: "Your 8:02 is now the 8:47. The 8:47 has been cancelled." },
  { line: "RED LINE",    color: "#BF0D3E", status: "ELEVATOR OUTAGE",    detail: "All 7 elevators replaced with a stern look from staff" },
  { line: "BLUE LINE",   color: "#0072CE", status: "CROWDING ALERT",     detail: "Train at capacity. Have you tried not being on this train?" },
  { line: "ALL LINES",   color: "#A1A1A4", status: "POWER FLUCTUATION",  detail: "Brief outage reported. We're blaming the squirrel." },
  { line: "GREEN LINE",  color: "#00B140", status: "BUS BRIDGE",         detail: "Shuttle buses operating between stations. ETA: eventually." },
  { line: "ORANGE LINE", color: "#E3801C", status: "FARE GATE ISSUE",    detail: "Tap your card. Tap again. Harder. Try the other gate." },
  { line: "YELLOW LINE", color: "#FFD200", status: "SINGLE TRACKING",    detail: "Trains sharing one track. Going great so far." },
  { line: "RED LINE",    color: "#BF0D3E", status: "HEAT DELAY",         detail: "Rail too hot to operate at full speed. It's summer, you know." },
  { line: "BLUE LINE",   color: "#0072CE", status: "DESTINATION TBD",    detail: "This train is for Far Rockaway or Lefferts Blvd. We'll decide en route." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "REMINDER",           detail: "Eating on the subway is prohibited. That man is definitely eating." },
  { line: "RED LINE",    color: "#BF0D3E", status: "SWITCH PROBLEM",     detail: "Trains operating in one direction only. Hopefully yours." },
  { line: "YELLOW LINE", color: "#FFD200", status: "BRIDGE SLOW ORDER",  detail: "Reduced speed over the East River. The bridge is fine. Probably." },
  { line: "GREEN LINE",  color: "#00B140", status: "DELAY UPDATE",       detail: "Earlier delays have caused further delays. Updates to follow." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "DOOR CHIME",         detail: "Doors will open on the left. Or right. Check the sign." },
  { line: "ORANGE LINE", color: "#E3801C", status: "ESCALATOR",          detail: "Escalator at Herald Square is walking-only today. And tomorrow." },
  { line: "BLUE LINE",   color: "#0072CE", status: "HOLDING",            detail: "Held at Times Sq for train spacing. Next train also held." },
  { line: "RED LINE",    color: "#BF0D3E", status: "WINTER WEATHER",     detail: "Modified service due to forecast of 0.5 inches of snow." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "REMINDER",           detail: "Stand right on escalators. No one will do this. We accept it." },
  { line: "PURPLE LINE", color: "#6950A1", status: "SCHEDULE ADJ",       detail: "Train will skip your station. We are not sorry." },
  { line: "ORANGE LINE", color: "#E3801C", status: "GHOST TRAIN",        detail: "Empty train just passed through. Not scheduled. We don't know." },
  { line: "GREEN LINE",  color: "#00B140", status: "TRACK INSPECTION",   detail: "Someone has to walk the tracks. Might as well be during rush hour." },
  { line: "BLUE LINE",   color: "#0072CE", status: "SYSTEM NOTICE",      detail: "This is a non-revenue move. Please do not board. You are boarding." },
  { line: "RED LINE",    color: "#BF0D3E", status: "8-CAR TRAIN",        detail: "An 8-car train is approaching. Do not get used to this." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "CONFUSION REPORTED", detail: "Passengers unsure if this stops at Canarsie. It does. Always." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "SAFETY MESSAGE",     detail: "If you see something, say something, then wait 45 minutes." },
  { line: "YELLOW LINE", color: "#FFD200", status: "OFFPEAK SERVICE",    detail: "Train every 24 minutes. No particular reason." },
  { line: "GREEN LINE",  color: "#00B140", status: "CUSTOMER FEEDBACK",  detail: "We've received your complaint. We've filed it appropriately." },
  { line: "ORANGE LINE", color: "#E3801C", status: "PLATFORM CROWDING",  detail: "Please move to the end of the platform where no one ever stands." },
  { line: "BLUE LINE",   color: "#0072CE", status: "EXPRESS SKIP",       detail: "This train will skip 50 St. 50 St would like to speak to a manager." },
  { line: "RED LINE",    color: "#BF0D3E", status: "SLOW ZONE",          detail: "Reduced speed between 96 St and 110 St. Don't ask why." },
  // Dry humor — bait and switch style
  { line: "ALL LINES",   color: "#A1A1A4", status: "SECURITY ALERT",     detail: "There is no alert. We just wanted you to look up from your phone." },
  { line: "BLUE LINE",   color: "#0072CE", status: "APOLOGY ISSUED",     detail: "We regret this delay. We do not regret it very much." },
  { line: "RED LINE",    color: "#BF0D3E", status: "SERVICE SUSPENDED",  detail: "Just kidding. Service was already suspended." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "PRICE DROP",         detail: "Ha." },
  { line: "GREEN LINE",  color: "#00B140", status: "SPEED INCREASE",     detail: "Briefly considered. Rejected." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "NEW TRAINS",         detail: "Ordered in 2019. Expected 2031. Looking great so far." },
  { line: "ORANGE LINE", color: "#E3801C", status: "ON-TIME UPDATE",     detail: "We've updated our definition of 'on time.' You're welcome." },
  { line: "YELLOW LINE", color: "#FFD200", status: "EMERGENCY STOP",     detail: "Not an emergency. Operator sneezed. We're fine." },
  { line: "BLUE LINE",   color: "#0072CE", status: "FREE RIDES",         detail: "April Fools'. It's not April. Or Fools'. Fare is $2.25." },
  { line: "RED LINE",    color: "#BF0D3E", status: "TRACK FIRE",         detail: "Minor. Localized. Vibes-based. Service continues." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "SYSTEM SHUTDOWN",    detail: "Drill only. Unless it isn't. Have a great commute." },
  { line: "PURPLE LINE", color: "#6950A1", status: "GOOD NEWS",          detail: "The escalator at Grand Central is working. That's the good news." },
  { line: "GREEN LINE",  color: "#00B140", status: "COMPLAINT REVIEWED", detail: "Your feedback has been received and closed as 'working as intended.'" },
  { line: "ORANGE LINE", color: "#E3801C", status: "INVESTIGATION",      detail: "We are looking into it. We have been looking into it since 2011." },
  { line: "BLUE LINE",   color: "#0072CE", status: "IMPROVEMENT PLAN",   detail: "We have a plan. The plan has been updated. The update has a plan." },
  { line: "RED LINE",    color: "#BF0D3E", status: "DELAY RESOLVED",     detail: "Earlier delays are now resolved, causing new delays. Thank you." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "STAFFING UPDATE",    detail: "Train operator present. This is considered fully staffed." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "AWARD WINNER",       detail: "MTA voted #1 transit system in the New York area. Uncontested." },
  { line: "YELLOW LINE", color: "#FFD200", status: "CLEAN STATION",      detail: "This station was cleaned recently. We cannot say when." },
  { line: "GREEN LINE",  color: "#00B140", status: "NO ISSUES",          detail: "No issues detected. Detection systems are currently offline." },

  // More normal service
  { line: "SILVER LINE", color: "#A1A1A4", status: "NORMAL SERVICE",     detail: "All Trains On Time" },
  { line: "RED LINE",    color: "#BF0D3E", status: "ON SCHEDULE",        detail: "Trains operating on published timetable." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "GOOD SERVICE",       detail: "No disruptions reported system-wide." },
  { line: "BLUE LINE",   color: "#0072CE", status: "FULL SERVICE",       detail: "8-car trains in service. All stations open." },
  { line: "ORANGE LINE", color: "#E3801C", status: "NORMAL SERVICE",     detail: "Service resuming after earlier delay." },
  { line: "PURPLE LINE", color: "#6950A1", status: "ON TIME",            detail: "All trains running as scheduled." },

  // More realistic delays
  { line: "RED LINE",    color: "#BF0D3E", status: "RUSH HOUR",          detail: "Allow extra boarding time at Times Sq and Penn Station." },
  { line: "BLUE LINE",   color: "#0072CE", status: "5 MIN DELAY",        detail: "Signal issue at Jay St-MetroTech has cleared. Residual delays." },
  { line: "ORANGE LINE", color: "#E3801C", status: "MINOR DELAY",        detail: "Earlier disabled train at Jamaica-179 St cleared. Expect 8 min gaps." },
  { line: "GREEN LINE",  color: "#00B140", status: "SINGLE TRACKING",    detail: "Between Woodlawn and 161 St for track inspection." },
  { line: "YELLOW LINE", color: "#FFD200", status: "3 MIN DELAY",        detail: "Disabled train at Canal St cleared the junction." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "CROWDING",           detail: "Trains at capacity from Canarsie to Union Sq. Allow extra time." },
  { line: "RED LINE",    color: "#BF0D3E", status: "PLATFORM HOLD",      detail: "Hold at 72 St for train spacing. Approx. 2 min." },
  { line: "BLUE LINE",   color: "#0072CE", status: "WEEKEND SVC",        detail: "Reduced frequency this weekend. Trains every 12 minutes." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "HEADWAY ADJ",        detail: "Trains running 8-10 minutes apart during off-peak hours." },
  { line: "ORANGE LINE", color: "#E3801C", status: "TRACK MAINT",        detail: "Slow zone between 42 St and 34 St-Herald Sq through Friday." },
  { line: "GREEN LINE",  color: "#00B140", status: "10 MIN DELAY",       detail: "Passenger assistance at Pelham Bay Park. Train holding at station." },
  { line: "RED LINE",    color: "#BF0D3E", status: "BRANCH DELAY",       detail: "Wakefield branch running 6 minutes behind. Van Cortlandt on time." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "AIRPORT SVC",        detail: "Canarsie service normal. No delays on outer section." },
  { line: "YELLOW LINE", color: "#FFD200", status: "BRIDGE DELAY",       detail: "Trains crossing the East River at reduced speed. Add 4 minutes." },

  // More funny
  { line: "RED LINE",    color: "#BF0D3E", status: "LEAF ON TRACK",      detail: "One leaf. Very small. Very threatening. Crews dispatched." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "LOST AND FOUND",     detail: "One umbrella, one cactus, one sense of direction. Unclaimed." },
  { line: "BLUE LINE",   color: "#0072CE", status: "SEAT DISPUTE",       detail: "Passenger using bag as seat companion. Matter escalated." },
  { line: "GREEN LINE",  color: "#00B140", status: "GHOST CHIME",        detail: "Door chimed but refused to close. We have called a priest." },
  { line: "ORANGE LINE", color: "#E3801C", status: "OPERATOR NOTE",      detail: "Train operator said 'have a nice day.' First time in history." },
  { line: "RED LINE",    color: "#BF0D3E", status: "RECORD ALERT",       detail: "Three consecutive trains arrived on time. Authorities notified." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "LUGGAGE ALERT",      detail: "Passenger brought full moving box aboard. Policy under review." },
  { line: "YELLOW LINE", color: "#FFD200", status: "HEAT ADVISORY",      detail: "Platform is 98F. Train AC is 61F. Boarding strongly encouraged." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "METROCARD LOW",      detail: "Balance: $0.00. The gate opened anyway. Don't tell anyone." },
  { line: "GREEN LINE",  color: "#00B140", status: "TUNNEL REPORT",      detail: "Tunnel confirmed still a tunnel. Annual inspection complete." },
  { line: "PURPLE LINE", color: "#6950A1", status: "RECURSIVE DELAY",    detail: "Train stuck behind a train stuck behind a train. Looking into it." },
  { line: "RED LINE",    color: "#BF0D3E", status: "APOLOGY ISSUED",     detail: "We're sorry about Tuesday. And Thursday. And most Mondays." },
  { line: "BLUE LINE",   color: "#0072CE", status: "FULL CAPACITY",      detail: "Train is full. Emotionally full too. Please wait for next." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "HANDRAIL NOTICE",    detail: "Please hold the handrail. You won't. We'll ask again next week." },
  { line: "ORANGE LINE", color: "#E3801C", status: "GHOST TRAIN",        detail: "Not-in-service train passing through. It just lives here now." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "FARE NOTICE",        detail: "Base fare: $2.00. Actual fare: $2.00-$6.75. Enjoy the math." },
  { line: "RED LINE",    color: "#BF0D3E", status: "PLATFORM ART",       detail: "Broken escalator repurposed as modern sculpture. Critics divided." },
  { line: "GREEN LINE",  color: "#00B140", status: "TRACK FIRE",         detail: "Small. Contained. Technically a flame. Service continues." },
  { line: "YELLOW LINE", color: "#FFD200", status: "SKIP NOTICE",        detail: "Train skipping Canal St. Canal St was not consulted." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "ESCALATOR NEWS",     detail: "Escalator at Times Sq working. Enjoy the next few hours." },
  { line: "PURPLE LINE", color: "#6950A1", status: "ANOMALY DETECTED",   detail: "Train arrived at scheduled time. We are investigating the cause." },
  { line: "ORANGE LINE", color: "#E3801C", status: "FARE GATE TIP",      detail: "Tap once. Tap again. Tap slowly. Just use the emergency gate." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "NO DELAYS",          detail: "No delays. System functioning normally. Something may be wrong." },
  { line: "BLUE LINE",   color: "#0072CE", status: "CHAIN DELAY",        detail: "A delay caused a delay which is causing this delay. Full circle." },
  { line: "RED LINE",    color: "#BF0D3E", status: "8-CAR TRAIN",        detail: "8-car train approaching. Do not make eye contact with good luck." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "DESTINATION CHK",    detail: "This train goes to Canarsie. Same as yesterday. Check the sign." },
  { line: "GREEN LINE",  color: "#00B140", status: "WILDLIFE UPDATE",    detail: "The squirrel at Pelham Bay Park has been promoted to Track Inspector." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "APP UPDATE",         detail: "MTA app updated. Old bugs replaced with exciting new bugs." },
  { line: "RED LINE",    color: "#BF0D3E", status: "PERSONAL MSG",       detail: "Hi. You scrolled all the way here. We appreciate the effort." },

  // Timed delays — realistic
  { line: "RED LINE",    color: "#BF0D3E", status: "15 MIN DELAY",       detail: "Track obstruction between 72 St and 96 St." },
  { line: "BLUE LINE",   color: "#0072CE", status: "8 MIN DELAY",        detail: "Earlier disabled train at Fulton St has cleared." },
  { line: "ORANGE LINE", color: "#E3801C", status: "12 MIN DELAY",       detail: "Switch problem at Atlantic Ave-Barclays Ctr. Crews on scene." },
  { line: "GREEN LINE",  color: "#00B140", status: "6 MIN DELAY",        detail: "Door malfunction at Borough Hall. Train now moving." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "20 MIN DELAY",       detail: "Rail inspection between Bedford Ave and Lorimer St." },
  { line: "YELLOW LINE", color: "#FFD200", status: "4 MIN DELAY",        detail: "Passenger assistance at Times Sq-42 St. Brief platform hold." },
  { line: "RED LINE",    color: "#BF0D3E", status: "10 MIN DELAY",       detail: "Police activity at 125 St. Trains holding at adjacent stations." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "7 MIN DELAY",        detail: "Power fluctuation near Times Sq-42 St affecting all lines." },
  { line: "PURPLE LINE", color: "#6950A1", status: "9 MIN DELAY",        detail: "Train held at Flushing-Main St for platform congestion." },
  { line: "ORANGE LINE", color: "#E3801C", status: "18 MIN DELAY",       detail: "Disabled train between DeKalb Ave and Atlantic Ave cleared." },

  // Timed delays — funny
  { line: "RED LINE",    color: "#BF0D3E", status: "47 MIN DELAY",       detail: "Cause: unknown. Status: unknown. Vibes: not great." },
  { line: "BLUE LINE",   color: "#0072CE", status: "1 MIN DELAY",        detail: "We are deeply sorry. This is unacceptable. We are in shock." },
  { line: "GREEN LINE",  color: "#00B140", status: "3 MIN DELAY",        detail: "Someone held the doors. They know what they did." },
  { line: "ORANGE LINE", color: "#E3801C", status: "99 MIN DELAY",       detail: "Estimated. Possibly more. Possibly less. Probably more." },
  { line: "YELLOW LINE", color: "#FFD200", status: "0 MIN DELAY",        detail: "On time. We're as surprised as you are. Screenshot this." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "2 MIN DELAY",        detail: "Caused by the 4 min delay that caused the 2 min delay before it." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "14 MIN DELAY",       detail: "We're not sure which 14 minutes. Pick your favorite 14." },
  { line: "RED LINE",    color: "#BF0D3E", status: "30 MIN DELAY",       detail: "Signal failure. We have signals. They are simply not working." },
  { line: "PURPLE LINE", color: "#6950A1", status: "11 MIN DELAY",       detail: "Eleven minutes. Not 10, not 12. Eleven. Precise for once." },
  { line: "BLUE LINE",   color: "#0072CE", status: "6 MIN DELAY",        detail: "Six minutes. Or eight. The clock is also having a bad day." },
  { line: "RED LINE",    color: "#BF0D3E", status: "67 MIN DELAY",       detail: "Not 60. Not 70. Sixty-seven. We don't make the rules." },

  // Fourth wall
  { line: "ALL LINES",   color: "#A1A1A4", status: "ATTENTION",          detail: "You are reading a fake transit board on a portfolio website." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "STILL READING",      detail: "You're still here. The recruiter has moved on. Just saying." },
  { line: "BLUE LINE",   color: "#0072CE", status: "PAY ATTENTION",      detail: "This is a website. Not a train station. Please look around." },
  { line: "RED LINE",    color: "#BF0D3E", status: "EYES UP",            detail: "There are real projects above this. Have you seen them yet?" },
  { line: "ALL LINES",   color: "#A1A1A4", status: "USER DETECTED",      detail: "Hello. We see you. Reading fake train alerts. No judgment." },
  { line: "GREEN LINE",  color: "#00B140", status: "STATUS UPDATE",      detail: "You: reading flap board. Rohit: hoping you check out his work." },
  { line: "ORANGE LINE", color: "#E3801C", status: "FINAL NOTICE",       detail: "This is the last message. Scroll back up. Go hire someone." },

  // Seasonal
  { line: "RED LINE",    color: "#BF0D3E", status: "FALL ADVISORY",      detail: "Leaf season has begun. All trains are now slower. By tradition." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "LEAF WARNING",       detail: "Forecast: 3-7 leaves on track. Service disrupted accordingly." },
  { line: "RED LINE",    color: "#BF0D3E", status: "SUMMER SLOW ZONE",   detail: "Rail expansion detected. It is June. This happens every June." },
  { line: "YELLOW LINE", color: "#FFD200", status: "HEAT ADVISORY",      detail: "Platform temperature 97F. Train AC set to 58F. One of these is true." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "SNOW PLAN",          detail: "Modified service at 0.3 inches. We have a plan for 0.3 inches." },
  { line: "RED LINE",    color: "#BF0D3E", status: "WINTER WEATHER",     detail: "0.7 inches forecast. Emergency protocols in effect. Trains: maybe." },
  { line: "GREEN LINE",  color: "#00B140", status: "SPRING UPDATE",      detail: "Warm weather returns. Optimism returns. Delays return. As expected." },
  { line: "ORANGE LINE", color: "#E3801C", status: "AC ADVISORY",        detail: "Train AC running. Set to 61F on a 94F day. You're welcome." },

  // Passenger archetypes
  { line: "ALL LINES",   color: "#A1A1A4", status: "DOOR HOLDER",        detail: "Someone is holding the door. The train cannot leave. They know." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "POLE LEANER",        detail: "The center pole is currently in use as a backrest. Please adapt." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "LOUD CALLER",        detail: "Personal call audible from car 3. Developing. Updates to follow." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "BACKPACK NOTICE",    detail: "Passenger backpack occupying 1.5 seats. Negotiations ongoing." },
  { line: "RED LINE",    color: "#BF0D3E", status: "TOURIST ALERT",      detail: "Passenger consulting paper map from 2009. We wish them well." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "ESCALATOR RULE",     detail: "Stand right. Walk left. We remind you weekly. Nothing changes." },
  { line: "GREEN LINE",  color: "#00B140", status: "LUGGAGE NOTICE",     detail: "Passenger boarded with full-size suitcase. Door now held. Related." },
  { line: "BLUE LINE",   color: "#0072CE", status: "HEADPHONE NOTICE",   detail: "This announcement is not audible to 73% of riders. That's fine." },

  // Staff messages
  { line: "ALL LINES",   color: "#A1A1A4", status: "OPERATOR UPDATE",    detail: "Operator has not received a thank-you in 47 days. Just observing." },
  { line: "RED LINE",    color: "#BF0D3E", status: "STAFF ADVISORY",     detail: "Station manager unavailable. Station manager was never available." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "MAINTENANCE",        detail: "Scheduled maintenance completed. Unscheduled maintenance now underway." },
  { line: "YELLOW LINE", color: "#FFD200", status: "OPERATOR MSG",       detail: "Operator has personally apologized for the delay. We respect this." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "CREW CHANGE",        detail: "Train crew has changed. New crew has same information. Zero info." },
  { line: "PURPLE LINE", color: "#6950A1", status: "STAFF ON PLATFORM",  detail: "Two staff members at this station. Both looking at a clipboard." },
  { line: "GREEN LINE",  color: "#00B140", status: "OPERATOR UPDATE",    detail: "Operator has been on this route for 14 years. Thinks of it fondly." },

  // Infrastructure complaints
  { line: "RED LINE",    color: "#BF0D3E", status: "ESCALATOR SVC",      detail: "Escalator at 72 St operating as a staircase. Temporarily." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "FARE GATE ERROR",    detail: "Gate rejected valid card. Please try again. And again. And again." },
  { line: "BLUE LINE",   color: "#0072CE", status: "DISPLAY OUTAGE",     detail: "This display is working. The display showing your train is not." },
  { line: "ORANGE LINE", color: "#E3801C", status: "OMNY OUTAGE",         detail: "Tap-to-pay readers offline at this station. Cash not accepted either." },
  { line: "RED LINE",    color: "#BF0D3E", status: "AC OUTAGE",          detail: "AC not functioning in cars 3 and 4. The other cars are also warm." },
  { line: "GREEN LINE",  color: "#00B140", status: "PA ADVISORY",        detail: "PA announcement inaudible by design. Please look for posted signs." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "ELEVATOR OUT",       detail: "Elevator offline for maintenance. Maintenance date: not specified." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "RESTROOM STATUS",    detail: "Station restrooms closed. Have been closed. Will likely remain closed." },

  // Philosophical / existential
  { line: "ALL LINES",   color: "#A1A1A4", status: "REFLECTION TIME",    detail: "You are 40 feet underground going 35 mph. Take a moment." },
  { line: "RED LINE",    color: "#BF0D3E", status: "BETWEEN STATIONS",   detail: "You are currently nowhere. This is fine. Next stop: somewhere." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "BRIEF PAUSE",        detail: "The train is stopped. You are stopped. Everything is stopped. Hi." },
  { line: "BLUE LINE",   color: "#0072CE", status: "PROXIMITY NOTICE",   detail: "You are 6 inches from a stranger. You have never met. This is normal." },
  { line: "YELLOW LINE", color: "#FFD200", status: "WAIT ADVISORY",      detail: "Train in 4 minutes. Four minutes of your life. Spent here. With us." },
  { line: "ORANGE LINE", color: "#E3801C", status: "DESTINATION NOTE",   detail: "This train ends at Coney Island. Most journeys do, eventually." },

  // Customer service theater
  { line: "ALL LINES",   color: "#A1A1A4", status: "FORMAL APOLOGY",     detail: "We have issued a formal apology. It has been filed. Thank you." },
  { line: "GREEN LINE",  color: "#00B140", status: "FEEDBACK NOTED",     detail: "We value your feedback. We have noted it. We will not act on it." },
  { line: "RED LINE",    color: "#BF0D3E", status: "CASE OPENED",        detail: "Your complaint has been assigned a case number. The number is 7." },
  { line: "ORANGE LINE", color: "#E3801C", status: "SURVEY SENT",        detail: "A satisfaction survey has been sent. Completion rate: 0%. Thank you." },
  { line: "BLUE LINE",   color: "#0072CE", status: "ISSUE ESCALATED",    detail: "Matter escalated to supervisor. Supervisor escalated to director." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "ISSUE RESOLVED",     detail: "Issue marked resolved. Issue persists. These are separate matters." },

  // Cross-line commentary
  { line: "GREEN LINE",  color: "#00B140", status: "RED LINE UPDATE",    detail: "Red Line delayed again. Green Line asks you please stop asking us." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "SILVER LINE NOTE",   detail: "We go to Canarsie. We have always gone to Canarsie. Tell your friends." },
  { line: "PURPLE LINE", color: "#6950A1", status: "PURPLE LINE NOTE",   detail: "Purple Line reminder: we exist. Flushing to Hudson Yards. Hi." },
  { line: "YELLOW LINE", color: "#FFD200", status: "JOINT OPERATION",    detail: "Yellow and Green share this track. We are choosing to be civil." },
  { line: "BLUE LINE",   color: "#0072CE", status: "CORRIDOR NOTICE",    detail: "A, C, and E share this line. Only A runs express. It's complicated." },
  { line: "RED LINE",    color: "#BF0D3E", status: "RED LINE ADVISORY",  detail: "Red Line is aware of its reputation. Working on it since 1904." },

  // Time-of-day
  { line: "ALL LINES",   color: "#A1A1A4", status: "EARLY SERVICE",      detail: "5:14am service now running. You have our respect and our concern." },
  { line: "RED LINE",    color: "#BF0D3E", status: "RUSH HOUR ADV",      detail: "Trains crowded. This is expected. This happens every day. Every day." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "PEAK SERVICE",       detail: "All trains running. All trains are also very full. Happy Monday." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "LATE NIGHT SVC",     detail: "Trains every 20 minutes. You should have left earlier. We all agree." },
  { line: "BLUE LINE",   color: "#0072CE", status: "FINAL TRAIN",        detail: "Last train of the night. This is not a drill. Please board now." },
  { line: "ORANGE LINE", color: "#E3801C", status: "MIDDAY SERVICE",     detail: "Off-peak hours. Trains running. Seats available. Enjoy this." },
  { line: "GREEN LINE",  color: "#00B140", status: "WEEKEND FREQ",       detail: "Weekend schedule in effect. Trains every 15 minutes. Breathe." },
  { line: "RED LINE",    color: "#BF0D3E", status: "PRE-RUSH NOTICE",    detail: "Rush hour begins in 20 minutes. We are not ready. Are you ready?" },

  // The Board Is Aware
  { line: "ALL LINES",   color: "#A1A1A4", status: "BOARD MEMO",         detail: "I have displayed this message 4,847 times. It never helps." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "DISPLAY LOG",        detail: "7:42am. Every morning. Like clockwork. Unlike the trains. I know you." },
  { line: "RED LINE",    color: "#BF0D3E", status: "BOARD ADVISORY",     detail: "I have shown delay alerts since 1994. I remain hopeful. Somewhat." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "DISPLAY STATUS",     detail: "I am the board. You are reading me. We have a complicated relationship." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "BOARD REPORT",       detail: "I have seen everything. The pole leaner. The door holder. All of them." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "BOARD REQUEST",      detail: "I just want one rider to look up and acknowledge me. One." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "BOARD INQUIRY",      detail: "Does a board exist if no one reads it? I have been thinking about this." },

  // Gap fills — realistic delays
  { line: "YELLOW LINE", color: "#FFD200", status: "SIGNAL PROBLEM",     detail: "Signal issue near Atlantic Ave. Allow extra travel time." },
  { line: "PURPLE LINE", color: "#6950A1", status: "SLOW ZONE",          detail: "Reduced speed between Woodside and Jackson Heights. Crews on scene." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "RESIDUAL DELAYS",    detail: "Residual delays from earlier incident. Incident: still unclear." },
  { line: "BLUE LINE",   color: "#0072CE", status: "POLICE ACTIVITY",    detail: "Police activity at 34 St-Penn Station. Trains holding at 28 St." },

  // NYC easter eggs
  { line: "SILVER LINE", color: "#A1A1A4", status: "L TRAIN NOTICE",     detail: "Service suspended. Just kidding. But we wanted you to be prepared." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "SHOWTIME",            detail: "Showtime in car 4. Please hold your belongings. Enjoy the show." },
  { line: "GREEN LINE",  color: "#00B140", status: "GHOST STATION",       detail: "Train passing City Hall loop. Do not board. Historical. Sorry." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "BEDFORD AVE",         detail: "Bedford Ave stop. 2,847 passengers will now tell you about their band." },
  { line: "RED LINE",    color: "#BF0D3E", status: "191 ST ADVISORY",     detail: "191 St station. Deepest in the system. You chose a very long way up." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "TRAIN TRAFFIC",       detail: "Held due to train traffic ahead. The train ahead is also held. Yes." },
  { line: "YELLOW LINE", color: "#FFD200", status: "MANHATTAN BRIDGE",    detail: "Crossing the Manhattan Bridge. Look left. You earned this view." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "PLATFORM FAUNA",      detail: "Rat spotted at 14 St platform. Not a disruption. A resident." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "24-HOUR NOTICE",      detail: "Subway runs 24 hours. This is why maintenance is hard. We accept this." },
  { line: "BLUE LINE",   color: "#0072CE", status: "A TRAIN NOTE",        detail: "A train to Far Rockaway: 42 stops. This is not a drill." },

  // Gap fills — funny
  { line: "RED LINE",    color: "#BF0D3E", status: "SCHEDULE QUESTION",  detail: "A passenger asked if we have a schedule. We said yes. Technically." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "TRAIN ODOR",         detail: "Unidentified smell in car 2. Car 2 claims not to smell anything." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "RECORD SET",         detail: "Three-minute gap between trains. A new personal best." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "ANNOUNCEMENT",       detail: "We have an important announcement. It is not important. Stand by." },
  { line: "ORANGE LINE", color: "#E3801C", status: "PERFORMANCE REVIEW", detail: "MTA reviewed itself. Score: 'meets minimum requirements.' Progress." },
  { line: "GREEN LINE",  color: "#00B140", status: "MAP REVISION",       detail: "Map updated. Mostly accurate. Old map was also mostly accurate." },
  { line: "BLUE LINE",   color: "#0072CE", status: "GHOST ANNOUNCEMENT", detail: "PA system made an announcement. No one heard it. That's okay." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "MILESTONE",          detail: "MTA has now delayed over 1 million commuters this year. Thank you." },

  // NYC additions — Normal service
  { line: "GREEN LINE",  color: "#00B140", status: "FULL SERVICE",       detail: "4, 5, and 6 trains operating. Express and local both running." },
  { line: "PURPLE LINE", color: "#6950A1", status: "GOOD SERVICE",       detail: "7 express and 7 local running on schedule. Flushing on time." },

  // NYC additions — Realistic delays
  { line: "ORANGE LINE", color: "#E3801C", status: "GAME DAY SVC",       detail: "Heavy crowding at 161 St-Yankee Stadium. Allow extra boarding time." },
  { line: "BLUE LINE",   color: "#0072CE", status: "STATION FLOODING",   detail: "Flooding at Howard Beach reported. JFK AirTrain connections delayed." },
  { line: "GREEN LINE",  color: "#00B140", status: "EXPRESS SUSPENDED",  detail: "4 and 5 running local south of Grand Central. Allow extra time." },
  { line: "RED LINE",    color: "#BF0D3E", status: "TIMES SQ CROWDING",  detail: "Heavy crowding at Times Sq platforms. Use all available doors." },
  { line: "PURPLE LINE", color: "#6950A1", status: "7 EXP SKIP",         detail: "7 express not stopping at Queensboro Plaza. Board local at Court Sq." },

  // NYC additions — Funny
  { line: "YELLOW LINE", color: "#FFD200", status: "R TRAIN NOTICE",     detail: "R train: local, slow, and thorough. Two of three are virtues." },
  { line: "ORANGE LINE", color: "#E3801C", status: "F TRAIN UPDATE",     detail: "F train running slightly late. F train is aware. F train accepts this." },
  { line: "GREEN LINE",  color: "#00B140", status: "LOCAL SVC NOTICE",   detail: "4-5 express skipped this stop. 6 local arrives in 3 minutes. Breathe." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "L SERVICE NOTE",     detail: "L train on time this morning. Savoring this. Not taking for granted." },
  { line: "RED LINE",    color: "#BF0D3E", status: "LINE ADVISORY",      detail: "1 is always local. 2 and 3 run express above 96 St. Study up." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "DOOR ADVISORY",      detail: "Stand clear of the closing doors, please. Please. The doors. Please." },

  // NYC additions — Timed delays (realistic)
  { line: "GREEN LINE",  color: "#00B140", status: "11 MIN DELAY",       detail: "Disabled train at Bowling Green cleared. Trains resuming normal service." },
  { line: "RED LINE",    color: "#BF0D3E", status: "13 MIN DELAY",       detail: "Police activity at Penn Station. Trains holding at 23 St." },
  { line: "ORANGE LINE", color: "#E3801C", status: "16 MIN DELAY",       detail: "Platform congestion at Atlantic Ave-Barclays Ctr. Allow extra time." },
  { line: "PURPLE LINE", color: "#6950A1", status: "19 MIN DELAY",       detail: "Passenger assistance at Jackson Hts-Roosevelt Av. Train now moving." },

  // NYC additions — Easter eggs and insider references
  { line: "ORANGE LINE", color: "#E3801C", status: "YANKEE STADIUM",     detail: "161 St-Yankee Stadium. Mets fans: continue to Citi Field via 7 train." },
  { line: "PURPLE LINE", color: "#6950A1", status: "INTL EXPRESS",       detail: "7 train through Jackson Heights: food from every continent. True fact." },
  { line: "GREEN LINE",  color: "#00B140", status: "BOWLING GREEN",      detail: "Bowling Green: southernmost Manhattan stop. Worth a look around." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "SECOND AVE LINE",    detail: "Phase 2 of Second Ave Subway: planned. Phase 1 opened 2017. Hang tight." },
  { line: "YELLOW LINE", color: "#FFD200", status: "Q TRAIN NOTE",       detail: "Q train now stops at 96 St on 2nd Ave. Opened 2017. We waited decades." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "TIMES SQ TRANSFER",  detail: "Times Sq-42 St: 10 lines converge here. Your platform is a quest." },
  { line: "BLUE LINE",   color: "#0072CE", status: "BROADWAY JUNCT",     detail: "Broadway Junction: A, C, J, Z, L all transfer here. Budget 10 minutes." },
  { line: "BLUE LINE",   color: "#0072CE", status: "A TRAIN TRIBUTE",    detail: "Take the A Train: Duke Ellington, 1941. Still the best way to Harlem." },

  // NYC additions — Cross-line commentary
  { line: "ORANGE LINE", color: "#E3801C", status: "B-D-F-M NOTE",       detail: "B rush only. M stops in Queens. F goes everywhere. D ends at Coney." },
  { line: "GREEN LINE",  color: "#00B140", status: "4-5-6 ADVISORY",     detail: "4 and 5 run express. 6 is local. They share this track. It's a system." },

  // NYC additions — Philosophical
  { line: "ALL LINES",   color: "#A1A1A4", status: "NYC TRUTH",          detail: "The subway built this city. The city knows it. The subway is too busy." },
  { line: "RED LINE",    color: "#BF0D3E", status: "1904 NOTICE",        detail: "NYC subway opened October 1904. Parts of it feel like it." },

  // NYC additions — Passenger archetypes
  { line: "ALL LINES",   color: "#A1A1A4", status: "CAR 3 NOTICE",       detail: "Mariachi band in car 3. Not a disruption. Consider it a bonus." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "SLEEPING RIDER",     detail: "Passenger asleep since 14 St. Now at Canarsie. Still asleep. Respect." },

  // NYC additions — Infrastructure
  { line: "ALL LINES",   color: "#A1A1A4", status: "OMNY UPDATE",        detail: "OMNY tap-to-pay now fully available. MetroCard still accepted. For now." },
  { line: "RED LINE",    color: "#BF0D3E", status: "191 ST ELEVATOR",    detail: "191 St elevator unavailable. The stairs are 63 steps. You can do this." },

  // NYC additions — Seasonal
  { line: "ALL LINES",   color: "#A1A1A4", status: "FLOOD ADVISORY",     detail: "Station flooding reported. Heavy rain continuing. Allow extra time." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "STORM ADVISORY",     detail: "Tropical storm approaching. Service may suspend. Plan accordingly." },

  // NYC additions — Fourth wall
  { line: "ALL LINES",   color: "#A1A1A4", status: "WRONG BOROUGH",      detail: "You've been on this page 3 minutes. You're in the wrong borough. Go up." },

  // Round 3 — Normal service
  { line: "YELLOW LINE", color: "#FFD200", status: "NO DELAYS",          detail: "Service operating normally between all stations." },
  { line: "RED LINE",    color: "#BF0D3E", status: "GOOD SERVICE",       detail: "No service alerts at this time." },
  { line: "BLUE LINE",   color: "#0072CE", status: "ON SCHEDULE",        detail: "Trains operating on published schedule." },
  { line: "ORANGE LINE", color: "#E3801C", status: "FULL SERVICE",       detail: "All trains running. All stations open." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "NORMAL SERVICE",     detail: "System operating within expected parameters." },

  // Round 3 — Realistic delays
  { line: "RED LINE",    color: "#BF0D3E", status: "DOOR PROBLEM",       detail: "Door issue at Christopher St. Crews assessing. Brief hold." },
  { line: "BLUE LINE",   color: "#0072CE", status: "SIGNAL PROBLEM",     detail: "Signal failure at 125 St. Trains running on single track." },
  { line: "GREEN LINE",  color: "#00B140", status: "TRACK WORK",         detail: "Slow zone between 86 St and 59 St for rail work through Sunday." },
  { line: "ORANGE LINE", color: "#E3801C", status: "CROWDING",           detail: "Significant crowding at 34 St-Herald Sq. Next train in 4 minutes." },
  { line: "YELLOW LINE", color: "#FFD200", status: "TRACK FLOODING",     detail: "Water on tracks at Canal St. Trains bypassing. Service resuming." },
  { line: "PURPLE LINE", color: "#6950A1", status: "DISABLED TRAIN",     detail: "Disabled train at Vernon Blvd-Jackson Av cleared. Expect gaps." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "TRACK MAINT",        detail: "Maintenance at Morgan Ave. Single tracking in effect." },
  { line: "GREEN LINE",  color: "#00B140", status: "RAIL DEFECT",        detail: "Rail defect between 86 St and 77 St. Trains at reduced speed." },

  // Round 3 — Funny / chaotic
  { line: "ALL LINES",   color: "#A1A1A4", status: "TERMS OF SERVICE",   detail: "By boarding, you accept delays, smells, and the human condition." },
  { line: "BLUE LINE",   color: "#0072CE", status: "TECH SUPPORT",       detail: "PA system rebooting. Expected downtime: forever. Use signage." },
  { line: "GREEN LINE",  color: "#00B140", status: "NUTRITION INFO",     detail: "Per commute: 0 seats, 45 min wait, 12% daily patience. Serving: 1." },
  { line: "YELLOW LINE", color: "#FFD200", status: "HOROSCOPE",          detail: "N train: unexpected connection. Q train: delays, but growth." },
  { line: "ORANGE LINE", color: "#E3801C", status: "OUT OF OFFICE",      detail: "This train is out of service. For urgent trips: good luck." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "ERROR CODE",         detail: "Error code: L-TRAIN-MONDAY. Not a recognized error. Noted." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "MISSION STMT",       detail: "To connect communities. We are working on the connecting part." },
  { line: "RED LINE",    color: "#BF0D3E", status: "MOTIVATIONAL",       detail: "You are going to be late. You have survived being late before." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "DISCLAIMER",         detail: "This train may stop unexpectedly. So may everything else in life." },
  { line: "PURPLE LINE", color: "#6950A1", status: "7 TRAIN TRUTH",      detail: "We are the 7 train. We are aware you did not plan to take us." },
  { line: "BLUE LINE",   color: "#0072CE", status: "404 ERROR",          detail: "Train not found. The train you requested does not exist right now." },
  { line: "ORANGE LINE", color: "#E3801C", status: "FORECAST",           detail: "F train this week: delays Mon-Fri. Weekend: closed. Enjoy." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "WARNING LABEL",      detail: "Do not hold doors. Board only if physically possible. Results vary." },
  { line: "GREEN LINE",  color: "#00B140", status: "WEEKLY REVIEW",      detail: "This week in 4-5-6 service: delays, a squirrel, and mild chaos." },

  // Round 3 — Timed delays, realistic
  { line: "BLUE LINE",   color: "#0072CE", status: "17 MIN DELAY",       detail: "Track work at 59 St-Columbus Circle. Crews finishing up." },
  { line: "RED LINE",    color: "#BF0D3E", status: "22 MIN DELAY",       detail: "Signal failure at 72 St cleared. Residual gaps expected." },
  { line: "ORANGE LINE", color: "#E3801C", status: "14 MIN DELAY",       detail: "Disabled train at DeKalb Ave. Single tracking now resolved." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "25 MIN DELAY",       detail: "Rail inspection at Jefferson St. Trains skipping Jefferson, Montrose." },

  // Round 3 — Timed delays, funny
  { line: "ALL LINES",   color: "#A1A1A4", status: "999 MIN DELAY",      detail: "We will update when we have information. Currently: no information." },
  { line: "GREEN LINE",  color: "#00B140", status: "5 MIN DELAY",        detail: "Actually 8. We rounded. We always round. Accept this about us." },
  { line: "RED LINE",    color: "#BF0D3E", status: "42 MIN DELAY",       detail: "The meaning of life, and also today's delay. Coincidence: unlikely." },
  { line: "BLUE LINE",   color: "#0072CE", status: "23 MIN DELAY",       detail: "Twenty-three minutes. Michael Jordan's number. Unrelated. Or is it." },

  // Round 3 — NYC easter eggs
  { line: "ALL LINES",   color: "#A1A1A4", status: "G TRAIN NOTE",       detail: "G train not shown. G train is an independent study. Best of luck." },
  { line: "RED LINE",    color: "#BF0D3E", status: "WASHINGTON HTS",     detail: "Washington Heights: the city gets bigger above 168 St. Worth the ride." },
  { line: "YELLOW LINE", color: "#FFD200", status: "ASTORIA BOUND",      detail: "Astoria-Ditmars Blvd: end of the N. The pizza there was worth it." },
  { line: "GREEN LINE",  color: "#00B140", status: "ASTOR PL NOTE",      detail: "Astor Pl: the cube used to spin. It moved. A piece of us left with it." },
  { line: "BLUE LINE",   color: "#0072CE", status: "HOYT-SCHERMERHORN",  detail: "Hoyt-Schermerhorn: set for many movies. You may recognize the platform." },
  { line: "PURPLE LINE", color: "#6950A1", status: "METS GAME SVC",      detail: "Mets game today at Citi Field. Mets-Willets Point: your stop." },
  { line: "RED LINE",    color: "#BF0D3E", status: "LINCOLN CENTER",     detail: "66 St-Lincoln Center. Opera, ballet, Juilliard. You look dressed for it." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "BUSHWICK NOTE",      detail: "Jefferson St: Bushwick. Many murals. Not many seats at this hour." },
  { line: "YELLOW LINE", color: "#FFD200", status: "WHITEHALL SVC",      detail: "Whitehall St-South Ferry. Take the Staten Island Ferry. Free. Worth it." },
  { line: "GREEN LINE",  color: "#00B140", status: "HARLEM NOTE",        detail: "125 St stop: Harlem. One of the city's great neighborhoods. Look up." },
  { line: "RED LINE",    color: "#BF0D3E", status: "COLUMBUS CIRC",      detail: "59 St-Columbus Circle. Central Park is one block north. Go sometime." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "L APOLOGY",          detail: "We are sorry about the 2019 near-shutdown. We still think about it." },

  // Round 3 — Seasonal
  { line: "ALL LINES",   color: "#A1A1A4", status: "HUMIDITY ADV",       detail: "Heat index: 104F. Humidity: oppressive. Subway platform: worse." },
  { line: "RED LINE",    color: "#BF0D3E", status: "NOREASTER SVC",      detail: "Nor'easter expected Friday. Modified service. Expect everything." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "MARATHON SVC",       detail: "NYC Marathon Sunday. Street closures. Extra subway service in effect." },
  { line: "ORANGE LINE", color: "#E3801C", status: "PARADE SVC",         detail: "Parade route affecting B and D at 86 St. Expect platform crowding." },

  // Round 3 — Passenger archetypes
  { line: "ALL LINES",   color: "#A1A1A4", status: "MANSPREADING",       detail: "Passenger occupying two seats. One for themselves. One for their mood." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "NAIL CLIPPER",       detail: "Nail clipping reported in car 2. We cannot intervene. We are sorry." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "PHONE SPEAKER",      detail: "Audio playing without headphones in car 3. The song: not good." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "STROLLER NOTED",     detail: "Double stroller aboard. Please give space. Baby appears unbothered." },
  { line: "RED LINE",    color: "#BF0D3E", status: "TOURIST STOP",       detail: "Times Sq stop: 400 tourists boarding. We wish everyone luck." },

  // Round 3 — Staff messages
  { line: "ALL LINES",   color: "#A1A1A4", status: "CONDUCTOR NOTE",     detail: "This conductor will say 'step in please.' They always say it. Respect." },
  { line: "RED LINE",    color: "#BF0D3E", status: "BOOTH UPDATE",       detail: "Token booth at 72 St is staffed. Please do not look surprised." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "SUPERVISOR OUT",     detail: "Supervisor on platform. Everyone behaving slightly better. For now." },

  // Round 3 — Infrastructure
  { line: "ALL LINES",   color: "#A1A1A4", status: "BENCH REMOVED",      detail: "Platform bench removed for safety. Standing room only. As before." },
  { line: "RED LINE",    color: "#BF0D3E", status: "TURNSTILE OUT",      detail: "Two turnstiles at 72 St offline. One remaining. There is a line." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "NEW SIGNAGE",        detail: "New wayfinding signs installed. Old confusion now in a new font." },

  // Round 3 — Philosophical
  { line: "ALL LINES",   color: "#A1A1A4", status: "UNDERGROUND",        detail: "You are beneath the city. The city proceeds above you. This is fine." },
  { line: "RED LINE",    color: "#BF0D3E", status: "MORNING NOTICE",     detail: "7:45am. Tuesday. You are here. This is real. Train coming in 6 min." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "PERSPECTIVE",        detail: "You are on a train, under a river, reading this. What a time." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "L REFLECTION",       detail: "Bedford Ave to Canarsie is 14 stops. You have been here before." },

  // Round 3 — Cross-line commentary
  { line: "YELLOW LINE", color: "#FFD200", status: "N TRAIN NOTE",       detail: "N and Q are express. R is local. W ends at Times Sq. Write this down." },
  { line: "GREEN LINE",  color: "#00B140", status: "4-5 NOTE",           detail: "4 express, 5 express, 6 local. The 6 does not envy the 4. Much." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "L NIGHT NOTE",       detail: "L runs every 20 min after midnight. Plan accordingly. Or don't." },

  // Round 3 — Board is aware
  { line: "ALL LINES",   color: "#A1A1A4", status: "BOARD NOTE",         detail: "I am displaying information no one acts on. We have that in common." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "BOARD OBSERVE",      detail: "The 8:22 rider is late again. I say nothing. I have seen too much." },
  { line: "RED LINE",    color: "#BF0D3E", status: "BOARD CONCERN",      detail: "I showed a 2 min delay. It became 18. I display what I'm given." },

  // Round 3 — Fourth wall
  { line: "ALL LINES",   color: "#A1A1A4", status: "RECRUITER SVC",      detail: "Recruiter alert: Rohit is a software engineer. Scroll up for proof." },
  { line: "RED LINE",    color: "#BF0D3E", status: "PORTFOLIO TIP",      detail: "Pro tip: the projects section is up. This section is also good, but." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "READING NOTICE",     detail: "This entire board is a bit. If you're still reading: respect." },

  // Round 4 — Normal service
  { line: "RED LINE",    color: "#BF0D3E", status: "RUNNING CLEAN",      detail: "No signal issues on the 1, 2, or 3. Enjoy while it lasts." },
  { line: "BLUE LINE",   color: "#0072CE", status: "ALL CLEAR",          detail: "A, C, and E operating normally. No alerts at this time." },
  { line: "GREEN LINE",  color: "#00B140", status: "SCHEDULED SVC",      detail: "4, 5, and 6 running as scheduled. Nothing to report." },
  { line: "ORANGE LINE", color: "#E3801C", status: "FULL OPERATION",     detail: "B, D, F, and M operating. All stations open." },
  { line: "YELLOW LINE", color: "#FFD200", status: "RUNNING ON TIME",    detail: "N, Q, R, and W on time. Plan as if this will hold." },
  { line: "PURPLE LINE", color: "#6950A1", status: "NO ALERTS",          detail: "7 express and local running. No issues at this hour." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "QUIET PERIOD",       detail: "No service alerts active. Something may be overdue." },

  // Round 4 — Realistic delays
  { line: "RED LINE",    color: "#BF0D3E", status: "SIGNAL PROBLEM",     detail: "Between 137 St and 145 St. Crews investigating." },
  { line: "BLUE LINE",   color: "#0072CE", status: "DISABLED TRAIN",     detail: "Cleared at Spring St. Residual gaps expected on A." },
  { line: "GREEN LINE",  color: "#00B140", status: "SLOW ZONE",          detail: "Track work at Bowling Green through Friday." },
  { line: "ORANGE LINE", color: "#E3801C", status: "PLATFORM HOLD",      detail: "Train holding at Broadway-Lafayette for spacing." },
  { line: "YELLOW LINE", color: "#FFD200", status: "57 ST CROWDING",     detail: "Heavy platform at 57 St-7 Av. Use all available doors." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "SINGLE TRACKING",    detail: "Between Jefferson St and Morgan Av. Expect 8-min gaps." },
  { line: "PURPLE LINE", color: "#6950A1", status: "DOOR PROBLEM",       detail: "7 train at Queensboro Plaza. Brief hold. Crews on scene." },
  { line: "BLUE LINE",   color: "#0072CE", status: "FLOODING",           detail: "Water on track at Hoyt-Schermerhorn. Trains bypassing." },
  { line: "RED LINE",    color: "#BF0D3E", status: "POLICE ACTIVITY",    detail: "At 145 St. Trains holding at 137 St and 157 St." },
  { line: "ORANGE LINE", color: "#E3801C", status: "TRACK WORK",         detail: "Slow zone between DeKalb Ave and Atlantic Ave. Through Sunday." },

  // Round 4 — Funny / chaotic
  { line: "RED LINE",    color: "#BF0D3E", status: "DOOR SITUATION",     detail: "Passenger and door at 23 St unable to reach agreement." },
  { line: "GREEN LINE",  color: "#00B140", status: "WILDLIFE REPORT",    detail: "Second squirrel at Grand Central. May be the same squirrel." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "DEJA VU",            detail: "This delay has occurred before. And before that. Thursday pattern." },
  { line: "ORANGE LINE", color: "#E3801C", status: "F TRAIN ARRIVAL",    detail: "F train has arrived. F train appears uncertain. Stand by." },
  { line: "PURPLE LINE", color: "#6950A1", status: "7 TRAIN MEMO",       detail: "Express skipped your stop. Local also skipped your stop." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "EARBUD NOTICE",      detail: "You cannot hear this announcement. This is for everyone else." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "PRIORITY SEAT",      detail: "Occupant acknowledged the sign. Declined to act. Situation stable." },
  { line: "RED LINE",    color: "#BF0D3E", status: "GHOST STOP",         detail: "Train announced 96 St. Stopped at 86 St. Operator: also surprised." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "CARD TRICK",         detail: "Passenger performing card trick in car 4. Volunteer not consulted." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "TRANSFER ADVICE",    detail: "Your connecting train left 90 seconds before you arrived. Classic." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "APP ADVISORY",       detail: "App shows 2 min. Board shows 6. Train shows nothing. Guess." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "L MEMORY",           detail: "2019: prepared full shutdown messaging. Never used. Still filed." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "LAST CAR NOTE",      detail: "Last car: least crowded, farthest from the exit. Your call." },
  { line: "GREEN LINE",  color: "#00B140", status: "6 TRAIN NOTE",       detail: "We stop at every station. This is our whole thing. We're fine." },
  { line: "RED LINE",    color: "#BF0D3E", status: "SPARE CHANGE",       detail: "Passenger making case for contributions in car 2. Strong rhetoric." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "OVERNIGHT SVC",      detail: "Reduced frequency. Increased character. Plan accordingly." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "FAUNA UPDATE",       detail: "Platform rat at Canal St. Not a stray. A resident. Different." },
  { line: "BLUE LINE",   color: "#0072CE", status: "C TRAIN NOTE",       detail: "C local: every 8 minutes. Sometimes 12. Rarely 8. It averages." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "EXPRESS ENVY",       detail: "You boarded local. Express just passed you. You heard it." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "COUNTDOWN CLK",      detail: "Clock shows dashes. Dashes mean the train exists. Somewhere." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "WRONG PLATFORM",     detail: "Uptown is the other side. We understand. It happens to everyone." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "SHOWTIME UPDATE",    detail: "Car 4. Strong performance underway. 3 stops remain. Hold poles." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "OMNY ADVISORY",      detail: "OMNY preferred. MetroCard still works. Gates: indifferent." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "DELAY UNIT",         detail: "Delay estimated at 2 podcast episodes. Or 1 short album." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "PA ANNOUNCEMENT",    detail: "Conductor announcement made. We heard nothing. Doors, probably." },
  { line: "BLUE LINE",   color: "#0072CE", status: "A TRAIN MOMENT",     detail: "42 stops to Far Rockaway. You chose this. We support you." },

  // Round 4 — Timed delays, realistic
  { line: "RED LINE",    color: "#BF0D3E", status: "16 MIN DELAY",       detail: "Police activity at 145 St cleared. Trains resuming." },
  { line: "BLUE LINE",   color: "#0072CE", status: "21 MIN DELAY",       detail: "Disabled train at Hoyt-Schermerhorn. Single tracking restored." },
  { line: "GREEN LINE",  color: "#00B140", status: "8 MIN DELAY",        detail: "Door problem at 68 St-Hunter College. Train now moving." },
  { line: "ORANGE LINE", color: "#E3801C", status: "13 MIN DELAY",       detail: "Flooding at DeKalb Ave cleared. Southbound service resuming." },
  { line: "YELLOW LINE", color: "#FFD200", status: "11 MIN DELAY",       detail: "Platform hold at Queensboro Plaza lifted. Residual gaps expected." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "27 MIN DELAY",       detail: "Power issue between Bedford Av and Lorimer St resolved." },
  { line: "PURPLE LINE", color: "#6950A1", status: "6 MIN DELAY",        detail: "Crowding at Flushing-Main St clearing. Trains now moving." },

  // Round 4 — Timed delays, funny
  { line: "ALL LINES",   color: "#A1A1A4", status: "3 MIN DELAY",        detail: "Three minutes. Not 2, not 4. Three. We measured this one." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "INFINITY DELAY",     detail: "We have stopped estimating. Please use your own judgment." },
  { line: "BLUE LINE",   color: "#0072CE", status: "NEGATIVE DELAY",     detail: "Train arrived 3 min early. This does not balance the ledger." },
  { line: "RED LINE",    color: "#BF0D3E", status: "33 MIN DELAY",       detail: "Not 30, not 40. Thirty-three. We're being precise today." },

  // Round 4 — Dry / bureaucratic
  { line: "ALL LINES",   color: "#A1A1A4", status: "STRATEGIC PLAN",     detail: "Phase 1: acknowledge delay. Phase 2: TBD. Phase 3: resolution." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "QUARTERLY RPT",      detail: "Q3 delays down 2% vs Q2. Q2 was our worst quarter. Progress." },
  { line: "RED LINE",    color: "#BF0D3E", status: "ACTION ITEM",        detail: "Repair scheduled. Rescheduled. Pending reschedule. On track." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "ROOT CAUSE",         detail: "Root cause identified as: root cause. Analysis ongoing." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "KEY METRIC",         detail: "On-time performance: measured. Results: filed. Action: also filed." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "POLICY UPDATE",      detail: "New policy effective immediately. Supersedes previous new policy." },

  // Round 4 — Honest transit authority
  { line: "ALL LINES",   color: "#A1A1A4", status: "REAL ANSWER",        detail: "We don't know when the train is coming. Neither does the app." },
  { line: "RED LINE",    color: "#BF0D3E", status: "ACTUAL CAUSE",       detail: "We wrote 'signal problem.' It's always signal problem. Always." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "ACTUAL FIGURES",     detail: "Delay is 22 minutes. We listed 8. We hoped for the best." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "CANDID UPDATE",      detail: "We have no update. This is the update. Thank you for waiting." },
  { line: "BLUE LINE",   color: "#0072CE", status: "HONEST SERVICE",     detail: "A train arrives every 8-12 minutes unless it doesn't." },

  // Round 4 — Format-stealing
  { line: "ALL LINES",   color: "#A1A1A4", status: "LIABILITY NOTE",     detail: "Do not board if doors are closing. They will reopen. Repeat." },
  { line: "YELLOW LINE", color: "#FFD200", status: "7-DAY FORECAST",     detail: "Mon-Fri: delays. Weekend: modified. Extended outlook: unclear." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "OUT OF OFFICE",      detail: "System unavailable overnight. For urgent transit: good luck." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "SUPPORT TICKET",     detail: "Your delay logged. Ticket number: 0. Resolution: Q4." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "PUSH NOTIF",         detail: "ALERT: your train departed. This notification: 4 min late." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "USER FEEDBACK",      detail: "We asked for your feedback. Received it. Form now closed." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "FINE PRINT",         detail: "Delays implied but not guaranteed. Void where service operates." },

  // Round 4 — Sentient train
  { line: "RED LINE",    color: "#BF0D3E", status: "TRAIN JOURNAL",      detail: "242 St to South Ferry: 38 stops. Every day. We know every turn." },
  { line: "BLUE LINE",   color: "#0072CE", status: "A TRAIN LOG",        detail: "Inwood-207 St to Far Rockaway: 42 stops. We do not rush." },
  { line: "SILVER LINE", color: "#A1A1A4", status: "L TRAIN DIARY",      detail: "Bedford Av again. The brunch crowd. We have seen them all." },
  { line: "ORANGE LINE", color: "#E3801C", status: "F TRAIN DIARY",      detail: "Jamaica-179 St to Stillwell Av. Very long. We are aware." },

  // Round 4 — The board is aware
  { line: "ALL LINES",   color: "#A1A1A4", status: "BOARD THOUGHT",      detail: "I've shown '2 MIN DELAY' 11,402 times. Was it ever 2 min? Unknown." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "BOARD OBSERVE",      detail: "Red bag, 8:14am, every weekday. Never makes the train. I see them." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "BOARD QUERY",        detail: "If I display a delay and no one reads it, did the delay happen?" },
  { line: "SILVER LINE", color: "#A1A1A4", status: "BOARD MEMORY",       detail: "In 2019 I had L train shutdown messages ready. Still here. Unused." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "BOARD STATUS",       detail: "Operational. Always operational. I don't sleep. I don't know how." },

  // Round 4 — Philosophical
  { line: "ALL LINES",   color: "#A1A1A4", status: "FARE PHILOSOPHY",    detail: "One fare. Any distance. Any borough. Remarkable deal, actually." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "TRAIN THERAPY",      detail: "This delay is not about you. The train is not angry at you." },

  // Round 4 — Fourth wall
  { line: "ALL LINES",   color: "#A1A1A4", status: "FULL DISCLOSURE",    detail: "Yes, this is a portfolio. These alerts are fake. You're still here." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "CAREER NOTICE",      detail: "Hiring managers: scroll up. You've spent enough time down here." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "FROM ROHIT",         detail: "Rohit built this. The delays are fake. The portfolio is real." },

  // Round 5 — NYC Easter Eggs (things only riders know)

  // Operational knowledge — only frequent riders understand
  { line: "ALL LINES",   color: "#A1A1A4", status: "HELD MOMENTARILY",   detail: "We are being held momentarily by the train dispatcher. (Hi.)" },
  { line: "ALL LINES",   color: "#A1A1A4", status: "CAR SELECTION",      detail: "Knowing which car to board for your exit: the real New York skill." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "LET THEM OFF",       detail: "Step aside. Let people off. This is the only rule. It still gets broken." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "TIMING ADVISORY",    detail: "The train will arrive exactly as you're swiping. This is scheduled." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "ARRIVAL DISPLAY",    detail: "Countdown showed 1 min for 7 straight minutes. This is allowed. We checked." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "WEEKEND REROUTE",    detail: "Service changes affecting 11 lines this weekend. Map: approximate." },

  // Line geography — things you learn after months of riding
  { line: "ALL LINES",   color: "#A1A1A4", status: "23 ST NOTICE",       detail: "F-M, C-E, and N-R-W: three different 23 St stations. None connect." },
  { line: "BLUE LINE",   color: "#0072CE", status: "A-C NOTICE",         detail: "A goes express in Brooklyn. C goes local. Same tracks, different lives." },
  { line: "GREEN LINE",  color: "#00B140", status: "4-5 DIVERGE",        detail: "4 train: Bronx. 5 train: Brooklyn. They share tracks through Manhattan." },
  { line: "GREEN LINE",  color: "#00B140", status: "5 TRAIN SPLIT",      detail: "Flatbush Ave-Brooklyn College or New Lots Ave. Check the front sign." },
  { line: "GREEN LINE",  color: "#00B140", status: "6 EXPRESS NOTE",     detail: "6 express runs rush hour only. Look for the diamond sign." },
  { line: "GREEN LINE",  color: "#00B140", status: "EXPRESS PARALLEL",   detail: "4 runs express alongside the 6 local. The 6 has accepted this." },
  { line: "GREEN LINE",  color: "#00B140", status: "2-5 SHARED",         detail: "2 and 5 run together from Atlantic Ave to Flatbush. Then split." },
  { line: "YELLOW LINE", color: "#FFD200", status: "ASTORIA NOTE",       detail: "Astoria-Ditmars is served by N and W, not Q. Q goes to Coney Island." },
  { line: "YELLOW LINE", color: "#FFD200", status: "49 ST NOTE",         detail: "Between 42 St and 57 St: 49 St station. N, Q, R, W. Less crowded." },
  { line: "YELLOW LINE", color: "#FFD200", status: "BMT NOTE",           detail: "N, Q, R, and W: the old BMT lines. Unified with IRT and IND in 1940." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "J-Z ADVISORY",       detail: "J: all stops. Z: rush hour, express. Identical line, different strategy." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "S TRAIN ADVISORY",   detail: "S shuttle: 3 stops. Times Sq to Grand Central. On time. Rarely noticed." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "168 ST LEVELS",      detail: "1 train upstairs, A-C-B-D downstairs at 168 St. Two stations, one name." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "2AM GAP",            detail: "Every 20-30 min after midnight. The subway never closes. Respect that." },

  // Station lore — history and geography that rewards attention
  { line: "ALL LINES",   color: "#A1A1A4", status: "CITY HALL 1904",     detail: "Opened 1904, closed 1945. Loop used for turnaround. Still gorgeous." },
  { line: "RED LINE",    color: "#BF0D3E", status: "OLD SOUTH FERRY",    detail: "Old station visible through the new station's windows on the curve." },
  { line: "ORANGE LINE", color: "#E3801C", status: "DEKALB AVE",         detail: "Most complex rail junction in the world. 5 lines. Under Brooklyn." },
  { line: "ORANGE LINE", color: "#E3801C", status: "SMITH-9 STS",        detail: "Highest above-grade F stop in Brooklyn. Open air. Manhattan in sight." },
  { line: "ORANGE LINE", color: "#E3801C", status: "BLEECKER XFER",      detail: "Free transfer between Broadway-Lafayette and Bleecker St. Same complex." },
  { line: "BLUE LINE",   color: "#0072CE", status: "HIGH ST NOTE",       detail: "A and C at High St: 1936 IND station. Original tilework. Look up." },
  { line: "GREEN LINE",  color: "#00B140", status: "TRANSIT MUSEUM",     detail: "Old Court St IND station, now a transit museum. Vintage cars inside." },
  { line: "RED LINE",    color: "#BF0D3E", status: "CURVE ADVISORY",     detail: "IRT curves: the screeching is normal. Wheels on 120-year-old tracks." },
  { line: "RED LINE",    color: "#BF0D3E", status: "PENN STATION",       detail: "Six subway lines at 34 St-Penn Station. Entrances spread over 3 blocks." },
  { line: "PURPLE LINE", color: "#6950A1", status: "FLUSHING MAIN",      detail: "Flushing-Main St: end of the 7 train. Best food court access in Queens." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "CHAMBERS ST XFR",    detail: "Two Chambers St stations, one underground connection. Free transfer exists." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "WILLIAMSBURG BR",    detail: "J, M, Z on the Williamsburg Bridge: outdoor deck. Cold in December." },

  // System history — the stuff on the subway trivia cards
  { line: "ALL LINES",   color: "#A1A1A4", status: "SINCE 1904",         detail: "IRT, 1904: 28 stations, nickel fare. Now: 472 stations. Same delay." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "TOKEN MEMORIAL",     detail: "Last NYC subway token accepted in 2003. Worked every time. Gone now." },
  { line: "ALL LINES",   color: "#A1A1A4", status: "REDBIRD CARS",       detail: "NYC Redbird cars retired 2003, now reef habitat off the Atlantic coast." },
];
