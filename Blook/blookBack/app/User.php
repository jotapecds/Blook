<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Http\Requests\UserRequest;
use Laravel\Passport\HasApiTokens;
use App\Book;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    use Notifiable;
    use HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function registredBooks() // livros cadastrados
    {
        return $this->hasMany('App\Book');
    }

    public function createdPosts() // posts criados
    {
        return $this->hasMany('App\Post');
    }

    public function comments() // comentarios
    {
        return $this->hasMany('App\Comment');
    }

    public function favoritedBooks() // livros favoritados (minha estante)
    {
        return $this->belongsToMany('App\Book');
    }

    public function followers() // seguidores
    {
        return $this->belongsToMany('App\User', 'follows', 'followed', 'follower');
    }

    public function following() // usuarios que sigo
    {
        return $this->belongsToMany('App\User', 'follows', 'follower', 'followed');
    }

    public function likedPosts() // posts curtidos
    {
        return $this->belongsToMany('App\Post', 'posts_users', 'user_id', 'post_id');
    }

    public function createUser(UserRequest $request)
    {
        $this->name = $request->name;
        $this->email = $request->email;
        $this->password = bcrypt($request->password);
        $this->phone_number = $request->phone_number;
        $this->date_of_birth = $request->date_of_birth;
        $this->gender = $request->gender;
        $this->is_admin = $request->is_admin;
        $this->profile_pic = 'https://lorempixel.com/480/640/?'.rand(00000,99999);

        $this->save();
    }

    public function updateUser(UserRequest $request)
    {
        //TALVEZ ADICIONAR SENHA
        if ($request->name)
            $this->name = $request->name;
        if ($request->email)
            $this->email = $request->email;
        if ($request->phone_number)
            $this->phone_number = $request->phone_number;
        if ($request->date_of_birth)
            $this->date_of_birth = $request->date_of_birth;
        if ($request->gender)
            $this->gender = $request->genrder;
        if ($request->profile_pic)
            $this->profile_pic = $request->profile_pic;

        $this->save();
    }
}
