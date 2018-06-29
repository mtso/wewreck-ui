#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function random_amount() {
    echo $((1 + RANDOM % 10000))
}

function random_zip() {
    sort -R $DIR/zipcodes.txt | head -n 1
}

while true; do
  curl -X POST  https://stage-api.wepay.com/payments \
  -H 'Api-Version: 3.0-alpha.1' \
  -H 'App-Id: 87571' \
  -H 'App-Token: 7c4fa53c09' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: bd7b2572-ec06-4e75-98a0-445e53d52df9' \
  -d "{\"amount\":$( random_amount ),\"currency\":\"USD\",\"account_id\":\"55c45c04-a7ef-4123-8b30-0f11c237c59b\",\"payment_method\":{\"type\":\"credit_card\",\"credit_card\":{\"card_number\":\"4003830171874018\",\"cvv\":\"123\",\"expiration_month\":10,\"expiration_year\":19,\"card_holder\":{\"name\":{\"first\":\"Bob\",\"last\":\"Belcher\"},\"email\":\"bob@example.com\",\"address\":{\"country\":\"US\",\"postal_code\":\"$( random_zip )\"}}}},\"custom_data\":{\"description\":\"somerandomdescription\"}}"

  echo ""
  sleep 2
done
