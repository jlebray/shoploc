class ShopsController < ApplicationController
  def new
  end

  def index
  end

  def create
    @shop = Shop.new(params.require(:shop).permit(:chain, :name, :latitude,:longitude,:address,:city,:zip,:phone,:country_code))
    @shop.save
    render 'index'
  end

  def update
  end

  def delete
  end
end
