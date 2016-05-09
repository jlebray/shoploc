json.array!(@shops) do |shop|
  json.extract! shop, :id, :chain, :name, :latitude, :latitude, :longitude, :longitude, :address, :city, :zip, :phone, :country_code
  json.url shop_url(shop, format: :json)
end
