class CreateShops < ActiveRecord::Migration
  def change
    create_table :shops do |t|
      t.string :chain
      t.string :name, null:false
      t.decimal :latitude, precision: 9, scale: 7, null:false
      t.decimal :longitude, precision: 10, scale: 7, null:false
      t.string :address
      t.string :city
      t.integer :zip
      t.integer :phone
      t.string :country_code, limit: 3

      t.timestamps null: false
    end
  end
end
