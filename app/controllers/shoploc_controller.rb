require 'geokit-rails'

class ShoplocController < ApplicationController

  def index
  end

  def list 
    @origin = Geokit::LatLng.new params[:latitude], params[:longitude]
    if params[:radius].present?
      @radius = params[:radius]
      @shops = Shop.within(@radius, origin: @origin).sort_by { |a| a.distance_to @origin }
      @shops = @shops.first(params[:numberOfShops].to_i) if params[:numberOfShops].present?
    else
      @shops = Shop.all.sort_by { |a| a.distance_to @origin }.first(params[:numberOfShops].present? ? params[:numberOfShops].to_i : 5)
      @radius = 0.01 + @shops.last.distance_to(@origin).round(2)
    end
  end

end
