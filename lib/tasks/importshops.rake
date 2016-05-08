require 'csv'

desc "Import shops from a CSV file to the database"
task :importshops do
  CSV.foreach(
    ARGV.last || "#{RAILS_ROOT}/public/shops_shopmium.csv", 
    {headers: true})  
  do |shop|
    Shop.create(
      chain: shop['chain']
      name: shop['name']
      latitude: shop['latitude']
      longitude: shop['longitude']
      address: shop['address']
      city: shop['city']
      zip: shop['zip']
      phone: shop['phone']
      country_code: shop['country_code'])
  end
end
