<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', User::class);

        $users = User::query();

        $itemsPerPage = 10;

        if ( $request->has('itemsPerPage') ) {
            if ( $request->itemsPerPage === "-1" ) {
                $itemsPerPage = $users->count();
            } else {
                $itemsPerPage = $request->itemsPerPage;
            }
        }

        $sortBy = 'id';

        if ( $request->has('sortBy') ) {
            $sortBy = $request->sortBy;
        }

        $sortOrder = 'ASC';

        if ( $request->has('sortDesc') ) {
            $sortOrder = $request->sortDesc === 'true' ? 'DESC' : 'ASC';
        }

        return UserResource::collection($users->orderBy($sortBy, $sortOrder)->paginate($itemsPerPage));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\User $user
     *
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $this->authorize('view', $user);

        return new UserResource($user);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('create', User::class);

        $request->validate([
            'first_name' => ['required','max:255'],
            'last_name' => ['required','max:255'],
            'email' => ['required','max:255', 'email', 'unique:users,email' ],
            'role' => ['required'],
            'password' => ['required', 'min:8']
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $user->assignRole($request->role);

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\User                $user
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $this->authorize('update', $user);

        $validation = Validator::make($request->all(), [
            'first_name' => ['required','max:255'],
            'last_name' => ['required','max:255'],
            'email' => ['required','max:255', 'email', 'unique:users,email,' . $user->id  ],
            'role' => ['required'],
            'new_password' => ['required_with:old_password', 'min:8'],
            'new_password_confirmation' => ['required_with:old_password,new_password']
        ]);

        $validation->sometimes(
            'old_password',
            ['required',
                function ($attribute, $value, $fail) {
                    if (!Hash::check($value, auth()->user()->password)) {
                        $fail('Old Password didn\'t match');
                    }
                }
            ],
            function ($input) {
                return $input->new_password || $input->new_password_confirmation;
            }
        );

        $validation->sometimes('new_password', ['required', 'min:6', 'confirmed'], function ($input) {
            return $input->old_password || $input->new_password_confirmation;
        });

        if ($validation->fails()) {
            return response()->json([
                'message'    => "The given data was invalid.",
                'errors' => $validation->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->bio = $request->bio;

        if ($request->new_password) {
            $user->password = bcrypt($request->new_password);
        }

        if ($request->user()->can('updateRole', $user)) {
            $user->syncRoles($request->role);
        }

        $user->save();

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $this->authorize('delete', $user);

        $user->delete();

        return new UserResource($user);
    }
}
