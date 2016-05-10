require 'rake'
require 'csv'


desc "Import shops from a CSV file to the database"
task :importshops ,[:file] => :environment do |t, args|

  args.with_defaults file:"#{Rails.root}/public/shops_shopmium.csv"
  
  CSV.foreach(
    args.file,
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


