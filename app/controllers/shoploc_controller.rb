require 'geokit-rails'

class ShoplocController < ApplicationController

  def index
  end
  def list 
    @origin = Geokit::LatLng.new params[:latitude], params[:longitude]
    if params[:radius].present?
      @radius = params[:radius]
    @shops = Shop.within(@radius, origin: @origin).sort_by { |a| a.distance_to @origin }.first(5)
    else
      @shops = Shop.all.sort_by { |a| a.distance_to @origin }.first(5)
    end
  end

end
