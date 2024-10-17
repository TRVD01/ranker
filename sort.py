def vraag_gebruiker(item1, item2):
    keuze = input(f"Welk item vind je beter? (1 voor {item1}, 2 voor {item2}): ")
    return 1 if keuze == "1" else 2

def sorteer_lijst(lijst):
    print(f"Sorteer lijst: {lijst}")
    if len(lijst) <= 1:
        return lijst
    
    midden = len(lijst) // 2
    linker_helft = sorteer_lijst(lijst[:midden])
    rechter_helft = sorteer_lijst(lijst[midden:])
    
    return merge(linker_helft, rechter_helft)

def merge(linker, rechter):
    resultaat = []
    while linker and rechter:
        if vraag_gebruiker(linker[0], rechter[0]) == 1:
            resultaat.append(linker.pop(0))
        else:
            resultaat.append(rechter.pop(0))
    
    resultaat.extend(linker if linker else rechter)
    return resultaat

lijst = [
    "Mushroom Cup", 
    "Flower Cup", 
    "Star Cup", 
    "Special Cup", 
    "Shell Cup", 
    "Banana Cup", 
    "Leaf Cup", 
    "Lightning Cup"
]
gesorteerde_lijst = sorteer_lijst(lijst)
print("Gesorteerde lijst:", gesorteerde_lijst)