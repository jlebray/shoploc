class CreateShops < ActiveRecord::Migration
  def change
    create_table :shops do |t|
      t.string :chain
      t.string :name
      t.decimal :latitude, precision: 9, scale: 7
      t.decimal :longitude, precision: 10, scale: 7
      t.string :address
      t.string :city
      t.integer :zip
      t.integer :phone
      t.string :country_code

      t.timestamps null: false
    end
  end
end
