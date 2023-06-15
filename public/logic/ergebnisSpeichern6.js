function saveResult(challengeNumber) {
    var challengeResult = document.getElementById("challengeResult" + challengeNumber).value;

    var data = {
        "challengeNumber": challengeNumber,
        "result": challengeResult
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/speichern6', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Result saved successfully.");
            // Leere das Input-Feld
            document.getElementById("challengeResult" + challengeNumber).value = "";
            // Zeige die Bestätigungsmeldung an
            alert("Ergebnis wurde gesendet");
        }
    };
    xhr.send(JSON.stringify(data));
}