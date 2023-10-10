// Coinlayer API JavaScript code is included in the HTML file
// The Coinlayer API provides real-time cryptocurrency data

$(document).ready(function() {
  $.ajax({
    url: "https://api.coinlayer.com/api/live",
    data: {
      access_key: "66c64bd1f72d4c380c6b473fdddcfa06",
      target: "USD",
      symbols: "BTC,ETH,LTC",
    },
    dataType: "json",
    success: function(data) {
      if (data && data.success) {
        const cryptoList = $("#cryptoList");

        function createCard(symbol, rate) {
          var card = $("<div>").addClass("col-md-4");
          var cardBody = $("<div>").addClass("card-body");
          var cardTitle = $("<h5>").addClass("card-title").text(symbol);
          const cardText = `Rate: ${rate}`;
          cardBody.append(cardTitle, cardText);
          card.append(cardBody);
          return card;
        }

        $.each(data.rates, function(symbol, rate) {
          var card = createCard(symbol, rate);
          cryptoList.append(card);
        });
      }
    },
    error: function(error) {
      console.error(error);
    },
  });
});

/**
 * Retrieves live cryptocurrency rates from the Coinlayer API and displays them on the webpage.
 */
async function getRates() {
  try {
    const response = await $.ajax({
      url: "https://api.coinlayer.com/api/live",
      data: {
        access_key: "66c64bd1f72d4c380c6b473fdddcfa06",
        target: "USD",
        symbols: "BTC,ETH,LTC",
      },
      dataType: "json",
    });

    if (response && response.success) {
      const cryptoList = $("#cryptoList");

      for (const [symbol, rate] of Object.entries(response.rates)) {
        const card = createCard(symbol, rate);
        cryptoList.append(card);
      }
    } else {
      throw new Error("Invalid response");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
