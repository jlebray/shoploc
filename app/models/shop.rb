class Shop < ActiveRecord::Base
  
  # Forces the shops to have a name and correct coordinates
  validates :name, 
    presence:true
  validates :latitude,
    presence:true,
    inclusion: { in: -90..90}
  validates :longitude,
    presence:true,
    inclusion: { in: -180..180}

  # Allows the shops to be considered as LatLng for calculations
  acts_as_mappable default_units: :kms,
    lat_column_name: :latitude,
    lng_column_name: :longitude,
    distance_field_name: :distance
end
