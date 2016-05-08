require 'csv'

desc "Import shops from a CSV file to the database"
task importshops:[:environment] do
  file = ARGV.last || "#{RAILS_ROOT}/public/shops_shopmium.csv"
  
  CSV.foreach(
    file,
    {headers: true}
  ) do |shop|
    Shop.create(
      chain: shop['chain'],
      name: shop['name'],
      latitude: shop['latitude'],
      longitude: shop['longitude'],
      address: shop['address'],
      city: shop['city'],
      zip: shop['zip'],
      phone: shop['phone'],
      country_code: shop['country_code'])
  end
end
