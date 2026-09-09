# SWIPE_FILE, motivated seller language

Package `2026-09-08-da-site-rebuild`. Built by the method in
`knowledge/alara/sources/mariah-reddit-ad-angles.md` (V1, V3, V5): capture word-for-word, keep the
typos, rank by repetition, cite the thread for every phrase. Closes **G08**.

**Nothing below was written by me.** Every line is a contiguous span copied out of a real post by a
real person. Where a quote ran long it was cut at a word boundary and the cut marked with an ellipsis;
nothing inside a quotation mark was edited, corrected, or smoothed. If a phrase is not in this file, it
does not appear on the site as customer language.

---

## 1. What was actually pulled, and what refused to open

| Source | Result |
|---|---|
| **Reddit** (the method's default) | **Unavailable.** `curl` on the JSON endpoints comes back 403, `WebSearch` refuses the domain outright ("not accessible to our user agent"), and `WebFetch` reports it cannot fetch reddit.com. Reddit blocks this agent, so no Reddit data exists in this file. Routing around a site's own block was not attempted and should not be |
| **BiggerPockets** | **Unusable.** Pages load 200 but the thread body is rendered client side; only the forum navigation is in the HTML. Titles are visible in search, post text is not |
| **Justia Answers, Avvo** | **403** to both `WebFetch` and `curl`. These would have been the best Maryland-specific homeowner voice available and are worth a second attempt from a browser session |
| **AgingCare.com caregiver forum** | **Worked.** 7 threads, 77 replies. The richest vein by far for inherited, vacant, cleanout and condition language |
| **City-Data.com forums** | **Worked.** 3 threads, 30 posts. The only place the cash-buyer objection is discussed by sellers in their own words |

**Volume: 107 comments across 10 threads.** The method's target is roughly 100 to 200 (V3). Cleared,
but only by leaving Reddit. This is the answer to hypothesis **T1** in the ingest note, which asked
whether a seller-side sweep could clear the threshold at all: it can, on caregiver and general forums
rather than on real estate subreddits.

### Three limitations, stated before the data rather than after it

1. **No thread is from Maryland.** These are national forums. The situations are portable; the
   phrasing may not be. Any line drawn from here is customer language, not *Montgomery and Prince
   George's* customer language. Correcting that needs Maryland-local sources, and the two most likely
   ones both returned 403 today.
2. **Two of the three City-Data threads are old** (2013 and 2008). The method says favour recent (V3).
   They are kept because they are the only captured seller-side discussion of the cash-offer objection
   anywhere in this pull, and that objection has not changed. Every phrase carries its date so this
   can be judged rather than assumed.
3. **One captured phrase was dropped for a fence, not for quality.** A commenter's advice about
   demanding a bank letter before considering an offer contains a word banned by the `brand` group in
   `tools/copy_lint.py`, so it cannot be stored verbatim in this repo. The theme it carries is kept
   and is answered on the page in different words. Doctrine beat the method, which is the correct
   order.

---

## 2. Sources

| ID | Thread | Site | Asked | Replies read |
|---|---|---|---|---|
| S1 | Praying people out there please pray for me. My anxiety over selling inherited house is overwhelming | AgingCare | Apr 2023 | 14 |
| S2 | Selling my deceased parents' home as is, any thoughts? | AgingCare | Aug 2022 | 13 |
| S3 | Having to empty mom's house, getting ready to sell. This is so hard. | AgingCare | Jul 2021 | 17 |
| S4 | How do I find help clearing out my father's home after he passed? | AgingCare | Jun 2019 | 10 |
| S5 | At what point do I just sell dad's house? | AgingCare | May 2020 | 10 |
| S6 | I inherited a house. How do I sell it? | AgingCare | Jan 2022 | 7 |
| S7 | What about insurance on an empty house? | AgingCare | Sep 2021 | 6 |
| S8 | I'm Tired of Being a Landlord | City-Data | c. 2010 | 10 |
| S9 | Cash offer for house not for sale, is this a scam? | City-Data | Nov 2013 | 10 |
| S10 | Sellers: Do you actually feel "insulted" by low offers? | City-Data | Jul 2008 | 10 |

URLs:
S1 `https://www.agingcare.com/questions/praying-people-out-there-please-pray-for-me-my-anxiety-over-selling-inherited-house-is-overwhelming--480521.htm`
S2 `https://www.agingcare.com/questions/selling-my-deceased-parents-home-as-is-any-thoughts-476833.htm`
S3 `https://www.agingcare.com/questions/having-to-empty-moms-house-getting-ready-to-sell-this-is-so-hard-468616.htm`
S4 `https://www.agingcare.com/questions/how-do-i-find-help-clearing-out-my-fathers-home-after-he-passed-449910.htm`
S5 `https://www.agingcare.com/questions/at-what-point-do-i-just-sell-dads-house-458948.htm`
S6 `https://www.agingcare.com/questions/i-inherited-a-house-how-do-i-sell-it-472527.htm`
S7 `https://www.agingcare.com/questions/what-about-insurance-on-an-empty-house-470052.htm`
S8 `https://www.city-data.com/forum/renting/880716-im-tired-being-landlord-apartments-lease.html`
S9 `https://www.city-data.com/forum/real-estate/1990154-cash-offer-house-not-sale-scam.html`
S10 `https://www.city-data.com/forum/real-estate/389496-sellers-do-you-actually-feel-insulted.html`

---

## 3. The swipe file, ranked

`Threads` is the number of the 10 threads in which that theme appears. That is the repetition signal
the method ranks on (V3). The phrase itself comes from one named source; the count describes the
theme, not the sentence, and is stated that way so it cannot be read as 6 people saying one line.

### Pain

| # | Verbatim | Source | Threads |
|---|---|---|---|
| 1 | "overwhelmed with handling the process of clearing out and selling his home" | S4 | **7** |
| 2 | "It took me 3 months to empty everything out of the house" | S2 | **7** |
| 3 | "My problem was Moms house needed a lot of work." | S1 | **5** |
| 4 | "there's too much work to do on the house" | S7 | **5** |
| 5 | "I do not want to put any more money into this house" | S1 | **3** |
| 6 | "Paying taxes, insurance, and maintenance fees on a house" | S5 | **4** |
| 7 | "Vacant homes attract trouble." | S5 | **3** |
| 8 | "I cannot continue to maintain his home and property 4 hours away." | S3 | **3** |
| 9 | "the house is a burden, and I just wish that I could get up the courage..." | S1 | **3** |
| 10 | "It has yet to sell and we have reduced the price." | S7 | **3** |
| 11 | "spent 6 months WANTING to be insulted...." | S10 | **3** |
| 12 | "90 years of stuff, seriously" | S5 | **3** |
| 13 | "worthy of a Hoarders show" | S5 | **2** |
| 14 | "It is a liability and by no means an asset." | S8 | **1** |
| 15 | "landlording is great, that is until its not...." | S8 | **1** |
| 16 | "to many other ways to make money with less grief" | S8 | **1** |
| 17 | "I will never be a landlord again." | S8 | **1** |

### Desire

| # | Verbatim | Source | Threads |
|---|---|---|---|
| 18 | "I didn't get much for my Moms but I got rid of it." | S1 | **4** |
| 19 | "he said anything left in the house was ok with him" | S2 | **3** |
| 20 | "wouldn't have to have anything updated or repaired" | S5 | **4** |
| 21 | "we do not have to deal with strangers" | S6 | **2** |
| 22 | ""where is, as is," a phase I had never heard before" | S5 | **2** |

### Objection

| # | Verbatim | Source | Threads |
|---|---|---|---|
| 23 | "why would I leave 30-50k in their pocket" | S9 | **3** |
| 24 | "I guess they have to sniff out desperation somewhere.... not going to find it here." | S9 | **3** |
| 25 | "I don't think people should ASSUME everyone selling are desperate." | S10 | **3** |
| 26 | "they are typically looking for rock bottom type stuff" | S9 | **2** |
| 27 | "the people whom they referred to as vultures" | S10 | **2** |
| 28 | "Ive had vague cash offers ...with no definite price set, and I didn't pursue it." | S1 | **2** |
| 29 | "I was in a desperate need to sell situation and my agent knew it." | S10 | **1** |

---

## 4. What the data says that the previous draft got wrong

1. **The contents beat the condition.** Seven of ten threads are about the *stuff in the house*, not
   the roof. The previous hero led with repairs. Repairs rank third. "You do not clean it out" was one
   clause of a three-clause sentence and should have been the headline.
2. **A pain the previous draft did not have at all: the stale listing.** Three threads describe a house
   already listed, price already cut, nothing happening (#10, #11). That is a seller who has already
   tried the agent route and is now genuinely comparing. It is now a situation bullet.
3. **The objection is not "is this a scam", it is "you will pay me less and I know it."** #23 is the
   sharpest line in the pull and it is arithmetic, not fear. The "When you should not sell to us"
   section was already the right answer to it, written before the data existed, and the data says keep
   it and sharpen it.
4. **"As is" is not universally understood.** #22 is a seller in her sixties who had never heard the
   phrase. The page should not assume the term does any work on its own.
5. **What sellers call us: vultures** (#27), and people who "sniff out desperation" (#24). Any line
   that sounds eager reads straight into that. This is the argument against "Get my cash offer" as a
   button, arrived at independently in COPY_RATIONALE §16 and now confirmed by the source.
6. **Nothing in 107 comments supports a speed claim.** Not one person asked to close in seven days.
   They asked to stop paying for it and to stop dealing with it. Speed sells the query; relief sells
   the page.

## 5. Reuse

Keep this file live (V7). Re-run after the first 20 inbound calls and merge captured phone language in,
which will finally make it Maryland-specific. The unresolved gap is limitation 1: no Maryland source
opened today, and until one does, every line here is national language used on a county page.
