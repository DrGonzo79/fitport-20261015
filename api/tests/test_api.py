from fastapi.testclient import TestClient
from api.main import app

client=TestClient(app)
base={"excursion":{"name":"Temple","walkingMinutes":75,"standingMinutes":25,"stairs":38,"terrain":"rough","seatsEveryMinutes":30,"pace":"group","escapeRoute":False,"confidence":"traveler"},"traveler":{"walkingLimit":35,"standingLimit":15,"maxStairs":10,"roughTerrain":False,"needsSeatsEvery":10,"groupPace":False}}

def test_health(): assert client.get("/health").json()=={"status":"ok"}
def test_flags_unsafe_excursion():
    r=client.post("/assess",json=base)
    assert r.status_code==200
    assert r.json()["verdict"]=="DO NOT BOOK"
    assert "terrain" in r.json()["blockers"]
def test_fit_excursion():
    body={**base,"excursion":{**base["excursion"],"walkingMinutes":20,"standingMinutes":8,"stairs":4,"terrain":"flat","seatsEveryMinutes":8,"pace":"self","escapeRoute":True,"confidence":"verified"}}
    assert client.post("/assess",json=body).json()["verdict"]=="FIT"
def test_invalid_input(): assert client.post("/assess",json={**base,"excursion":{**base["excursion"],"stairs":-1}}).status_code==422
