class Shop < ActiveRecord::Base
  validates :name, 
    presence:true
  validates :latitude,
    presence:true,
    inclusion: { in: -90..90}
  validates :longitude,
    presence:true,
    inclusion: { in: -180..180}
  validates :phone, :zip,
    numericality: true,
    allow_blank:true

  acts_as_mappable default_units: :kms,
    lat_column_name: :latitude,
    lng_column_name: :longitude,
    distance_field_name: :distance
end
