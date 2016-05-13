require 'rake'
require 'csv'


desc "Import shops from a CSV file to the database"
task :importshops ,[:file] => :environment do |t, args|

  # If no parameters use public/shops_shopmium.csv
  args.with_defaults file:"#{Rails.root}/public/shops_shopmium.csv"
  
  # Parses any file as long as it has the needed columns name in the header
  CSV.parse(
    File.read(args.file).gsub(/,\s+/, ","),
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


