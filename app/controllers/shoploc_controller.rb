require 'geokit-rails'

class ShoplocController < ApplicationController

  def index
  end
  def list 
    @origin = Geokit::LatLng.new params[:latitude], params[:longitude]
    @radius = params[:radius]
    @shops = Shop.within(@radius, origin: @origin)
  end

end
